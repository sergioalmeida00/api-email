import { ICategoryRepository } from "@modules/statements/repositories/ICategoryRepository";
import dataSource from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { Category } from "../entities/Category";

export class CategoryRepository implements ICategoryRepository{
    private repository:Repository<Category>;
    constructor(){
        this.repository = dataSource.getRepository(Category);
    }

    async create(description_category: string): Promise<void> {
        const category = this.repository.create({description_category});
        await this.repository.save(category);
    }

    async findByIdCategory(id_category: string): Promise<Category | null> {
      const resultCategory = this.repository.findOneBy({id:id_category});
      return resultCategory;
    }

}