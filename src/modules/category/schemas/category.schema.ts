import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Category{
    @Prop()
    Category: string;

    @Prop
}

export const CategorySchema = SchemaFactory.createForClass(Category);