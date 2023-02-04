import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage } from 'http';
import { Observable } from 'rxjs';

interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = this.getRequest<IncomingMessage & { user?: User }>(context);
    try {
      const token = this.getToken(req);
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  protected getToken(req: {
    headers: Record<string, string | string[]>;
  }): string {
    const authorization = req.headers['authorization'];
    if (!authorization || Array.isArray(authorization)) {
      throw new Error('invalid authorization credentials');
    }
    const [_, token] = authorization.split(' ');
    return token;
  }
}
