import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Like } from "../likes/like.entities";
import { Interest } from "../interests/interest.entities";

@ObjectType()
@Entity("cat")
export class Cat extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  surname: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column({ nullable: true })
  birthday: Date;

  @Field()
  @Column({ nullable: true })
  sexe: string;

  @Field()
  @Column({ nullable: true })
  hair_color: string;

  @Field()
  @Column({ nullable: true })
  profile_picture: string;

  @Field()
  @Column({ nullable: true })
  available: string;

  @Field()
  @Column({ nullable: true })
  city: string;

  @Field()
  @Column({ nullable: true })
  breed: string;

  @Field()
  @Column({ nullable: true })
  surname: string;

  @Field()
  @Column({ default: "user" })
  role: string;

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.cat_id1)
  likedCats: Like[];

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.cat_id2)
  likedBy: Like[];

  @Field(() => [Interest], { nullable: true })
  @ManyToMany(() => Interest, (interest) => interest.cats)
  interests?: Interest[];
}
