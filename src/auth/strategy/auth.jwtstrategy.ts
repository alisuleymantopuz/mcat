import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { use } from 'passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interfaces/auth.interface'; 
import { AuthSettings} from '../../common/settings';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: AuthSettings.Key,
        });
    }

    async validate(req: Request, payload: JwtPayload, done: Function) {
        const user = await this.authService.validateUser(payload);
        
        if (!user) {
            return done(new UnauthorizedException(), false);
        }

        done(null, user);
    }
}