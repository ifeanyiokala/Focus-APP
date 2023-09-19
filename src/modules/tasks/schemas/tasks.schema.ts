import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Task {
    @Prop()
    title: string;

    @Prop()
    body: string;

    @Prop()
    Priority: number;

}


export const TaskSchema = SchemaFactory.createForClass(Task);