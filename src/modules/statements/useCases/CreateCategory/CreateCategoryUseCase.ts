import { ICategoryRepository } from "@modules/statements/repositories/ICategoryRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateCategoryUseCase{
    constructor (
        @inject('CategoryRepository')
        private categoryRepository:ICategoryRepository
    ){}

    async execute(description_category:string){
        await this.categoryRepository.create(description_category.toLocaleUpperCase());      
    }
}