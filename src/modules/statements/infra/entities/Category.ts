import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidV4} from 'uuid';
import { Statement } from "./Statement";

@Entity('categories')
export class Category{
    
    @PrimaryColumn({type:'uuid'})
    public id:string;

    @Column({type:'varchar'})
    public description_category:string;

    @OneToMany(() => Statement, statement => statement.categories)
    statements:Statement[];

    @CreateDateColumn({type:'timestamp'})
    public created_at:Date;

    @UpdateDateColumn({type:'timestamp'})
    public updated_at:Date;

    constructor(props:Omit<Category,'id'>, id?:string){
        if(!id){
            this.id = uuidV4()
        }
    }
}