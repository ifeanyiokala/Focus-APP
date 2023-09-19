import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Category{
    @Prop()
    Category: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);