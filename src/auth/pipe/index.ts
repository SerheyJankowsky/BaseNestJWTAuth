import { UsePipes } from '@nestjs/common';
import { SignUpPipe } from './signupPipe';

export const SignPipe = () => UsePipes(new SignUpPipe());
