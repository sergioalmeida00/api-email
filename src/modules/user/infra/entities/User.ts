import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import {v4 as uuidV4} from 'uuid';
import { Statement } from '../../../statements/infra/entities/Statement';

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


    @OneToMany(() => Statement, statement => statement.user)
    statement: Statement[];

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