import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Tasks {
    @Prop()
    title: string;

    @Prop()
    body: string;

    @Prop()
    author: string;
}


export const TaskSchema = SchemaFactory.createForClass(Tasks);