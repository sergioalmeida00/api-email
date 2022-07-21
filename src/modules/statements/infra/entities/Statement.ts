import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import {v4 as uuidV4} from 'uuid';
import { User } from '../../../user/infra/entities/User';
import { Category } from './Category';

enum OperationType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
  }

@Entity('statements')
export class Statement{

    @PrimaryColumn()
    public id:string;

    @Column()
    public user_id:string;

    @Column()
    public description:string;

    @Column()
    public amount:number;

    @Column({ type: 'enum', enum: OperationType })
    public type:OperationType;

    @ManyToOne(() => User, user => user.statement)
    @JoinColumn({ name: 'user_id' })
    user: User;   

    @CreateDateColumn()
    public created_at:Date;

    @UpdateDateColumn()
    public updated_at:Date;

    @Column({type:'uuid'})
    public id_category:string;

    @ManyToOne(() => Category, category => category.statements)
    @JoinColumn({name:'id_category'})
    categories:Category[]

    constructor(props: Omit<Statement,'id'>, id?:string){
        Object.assign(this, props);

        if(!id){
            this.id = uuidV4();
        }
    }

}