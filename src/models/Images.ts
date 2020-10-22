import {Entity,Column,PrimaryColumn, PrimaryGeneratedColumn,ManyToOne, JoinColumn} from 'typeorm';
import Estrutura from './Estrutura';

@Entity('images')
export default class Images{
@PrimaryGeneratedColumn('increment')
 id:number;

 @Column()
 path:string;

 @ManyToOne(()=>Estrutura, estrutura => estrutura.images)
 @JoinColumn({name:'estrutura_id'})
 estrutura:Estrutura;

}