import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthUserDto } from './dto/auth-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(authDto: AuthUserDto): Promise<void> {
    const { username, password } = authDto;
    const user = this.userRepository.create({ username, password });
    await this.userRepository.save(user);
  }
}
