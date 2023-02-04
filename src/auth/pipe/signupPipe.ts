import { SignUpDto } from '../dto/signUp';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class SignUpPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const errors: string[] = [];
    if (!this.confirmPassword(value)) {
      throw new BadRequestException('invalid request body');
    }
    if (value.password.length <= 10) {
      errors.push('password must be at least 10 character');
    }
    if (value.password !== value.confirmationPassword) {
      errors.push('password must be a same');
    }
    if (errors.length) {
      throw new BadRequestException(errors.join('\n'));
    }
    return value;
  }
  private confirmPassword(value: unknown): value is SignUpDto {
    return (
      typeof value === 'object' &&
      'password' in value &&
      'confirmationPassword' in value
    );
  }
}
