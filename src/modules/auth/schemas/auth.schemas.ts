import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
//import { Auth } from '../entities/auth.entity';

@Schema()
export class Auth {
    @Prop()
    title: string;

    @Prop()
    body: string;

    @Prop()
    author: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);