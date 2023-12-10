import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UserDocument } from '../schemas/user.schema';
import { MailerService } from '@nestjs-modules/mailer';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.findOne(email);
    if (users) {
      throw new BadRequestException('Email is Already Used');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = await this.usersService.create(email, result);
    return user;
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('incorrect password, please try again.');
    }
    return user;
  }

  async login(user: UserDocument) {
    const payload = { sub: user._id, email: user.email };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.jwt_secret,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.jwt_secret,
      }),
    };
  }
  async refreshToken(user: UserDocument) {
    const payload = { sub: user._id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.jwt_secret,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.jwt_secret,
      }),
    };
  }
  async sendMail(email: string) {
    this.mailerService.sendMail({
      to: `${email}`,
      from: 'eng.tarek.yahiia@gmail.com',
      subject: 'Verify Your Email',
      text: '',
      html: `<p>Please click on verify email button to complete Verifing Steps</p>
    <button> <a href="Front-End URL" target="_blank" style="display: inline-block; 
    padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; 
    font-size: 22px; color:#454B1B; text-decoration: none; border-radius: 8px;">Verify Email</button> `,
    });
  }
  async forgetPassword(email: string) {
    const payload = { sub: email, email: email };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.forget_Password,
        expiresIn: '300s',
      }),
    };
  }

  async resetPassword(
    body: { newPassword: string },
    req: { headers: { authorization: string } },
  ) {
    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      const user = this.jwtService.decode(token);
      const userData = await this.usersService.findOne(user.email);
      const { newPassword } = body;
      const scrypt = promisify(_scrypt);
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(newPassword, salt, 32)) as Buffer;
      const result = salt + '.' + hash.toString('hex');
      userData.password = result;
      return userData.save();
    } else {
      throw new UnauthorizedException();
    }
  }
}
