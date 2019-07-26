import { Strategy } from 'passport-local'; 
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PassportLocalModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../interfaces/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel('User') userModel: PassportLocalModel<User>) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        }, userModel.authenticate());
    }
} 