import { Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class Task {
    @Prop()
    title: string;

    @Prop()
    id: number;

    @Prop()
    body: string;

    @Prop()
    Priority: number;

    @Prop()
    dueDate: Date;

    @Prop()
    category_id: number;

    @Prop()
    task_status: string

    @Prop({default: false})
    completed: boolean;
}


export const TaskSchema = SchemaFactory.createForClass(Task);