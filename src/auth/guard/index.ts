import { JWTGuard } from './authGuard';
import { UseGuards } from '@nestjs/common';

export const Auth = () => UseGuards(JWTGuard);
