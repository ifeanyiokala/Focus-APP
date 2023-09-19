import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private readonly categoryModel: Model<Category>) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async findOne(id: string):  Promise<Category> { 
    return await this.categoryModel.findById(id).exec();
  }

  async create (category: Category): Promise<Category> {
    const newCategory = new this.categoryModel(category);
    return await newCategory.save();
  }

  async update(id: string, category: Category): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, category,{new: true});
  }
  
  async delete(id: string): Promise<Category> {
    return await this.categoryModel.findByIdAndRemove(id);
  }
}
