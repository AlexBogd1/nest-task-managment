import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  signIn(@Body() authDto: AuthUserDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
