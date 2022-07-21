import { Category } from "../infra/entities/Category";

interface ICategoryRepository{
    create(description_category:string):Promise<void>;  
    findByIdCategory(id_category:string):Promise<Category | null>;
}

export {ICategoryRepository}