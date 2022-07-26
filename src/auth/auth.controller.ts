import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authDto: AuthUserDto) {
    return this.authService.signUp(authDto);
  }

  @Post('/signin')
  signIn(@Body() authDto: AuthUserDto) {
    return this.authService.signIn(authDto);
  }
}
