import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import {v4 as uuidV4} from 'uuid';

@Entity('users')
export class User {

    @PrimaryColumn()
    public id:string;

    @Column()
    public name: string;

    @Column()
    public email:string;

    @Column()
    public password:string;

    @CreateDateColumn()
    public created_at:Date;

    @UpdateDateColumn()
    public updated_at:Date;

    constructor(props: Omit<User,'id'>, id?:string){
        Object.assign(this, props);

        if(!id){
            this.id = uuidV4();
        }
    }

}