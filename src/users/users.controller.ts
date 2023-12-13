import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Get,
  Query,
  Request,
  Session,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { createUserDto } from './dtos/create-user.dto';
import { serialize } from '../interceptors/serialize.interceptor';
import { tokensDto } from './dtos/tokens.dto';
import { RefreshJwtGuard } from '../guards/refresh-token.guard';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtGuard } from '../guards/jwt-auth.guard';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User, UserDocument } from '../schemas/user.schema';
import { Types } from 'mongoose';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @serialize(tokensDto)
  @Post('/signup')
  async createUser(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user._id;
    const tokens = await this.authService.login(user);
    await this.authService.sendMail(body.email);
    return tokens;
  }

  @serialize(tokensDto)
  @Post('/signin')
  async signin(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user._id;
    const tokens = await this.authService.login(user);
    return tokens;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  
  @ApiBearerAuth()
  @UseGuards(RefreshJwtGuard)
  @Post('/refreshToken')
  async getRefreshToken(
    @Request() req,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.refreshToken(req.user);
  }

  @ApiBearerAuth()
  @serialize(UserDto)
  @Post('/resetPassword')
  async resetPassword(
    @Body() body: { newPassword: string },
    @Request() req: { headers: { authorization: string } },
  ) {
    const user = await this.authService.resetPassword(body, req);
    return user;
  }

  @Post('/forgetPassword')
  async forgetPassword(@Query('email') email: string) {
    const user = await this.usersService.findOne(email);
    await this.authService.sendMail(email);
    const token = await this.authService.forgetPassword(email);
    return token;
  }

  @ApiBearerAuth()
  @serialize(UserDto)
  @UseGuards(JwtGuard)
  @Get('/users')
  findAllUsers() {
    return this.usersService.findUsers();
  }

  @serialize(UserDto)
  @UseGuards(AuthGuard)
  @Get('/whoami')
  whoAmI(@CurrentUser() user: UserDocument) {
    return user;
  }

  @serialize(UserDto)
  @Get('/:id')
  async findUserById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);

    return user;
  }

  @serialize(UserDto)
  @Get()
  findUserByEmail(@Query('email') email: string) {
    return this.usersService.findOne(email);
  }

  @serialize(UserDto)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
