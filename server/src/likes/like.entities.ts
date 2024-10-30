import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Cat } from "../cats/cat.entities";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Like extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ default: false })
  isMatch: boolean;

  @Field(() => Cat)
  @ManyToOne(() => Cat, (cat) => cat.likedCats)
  cat_id1: Cat;

  @Field(() => Cat)
  @ManyToOne(() => Cat, (cat) => cat.likedBy)
  cat_id2: Cat;
}
