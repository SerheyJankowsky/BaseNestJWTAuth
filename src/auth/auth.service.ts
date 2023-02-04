import { SignUpDto } from './dto/signUp';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { LoginDto } from './dto/login';

interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private readonly jwtServise: JwtService) {}

  findUser(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  createToken(user: User): { accessToken: string } {
    return { accessToken: this.jwtServise.sign(user) };
  }

  //sign up
  async signUp(newUser: SignUpDto): Promise<{ accessToken: string }> {
    const isUserExist = this.findUser(newUser.email);

    if (isUserExist) {
      throw new ConflictException('user already exists');
    }

    const user: User = {
      username: newUser.userName,
      password: await argon.hash(newUser.password),
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };

    this.users.push(user);

    return this.createToken(user);
  }

  async login(user: LoginDto): Promise<{ accessToken: string }> {
    try {
      const isExist: User | undefined = await this.findUser(user.email);
      if (!isExist) {
        throw new Error();
      }
      const matchPassword = await argon.verify(isExist.password, user.password);
      if (!matchPassword) {
        throw new Error();
      }
      return this.createToken(isExist);
    } catch (error) {
      throw new UnauthorizedException('Email or password is invalid');
    }
  }
}
