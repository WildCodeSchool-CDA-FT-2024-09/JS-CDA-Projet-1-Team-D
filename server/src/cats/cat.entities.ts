import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import {
  IsEmail,
  IsString,
  Length,
  IsDate,
  IsOptional,
  IsIn,
  IsUrl,
} from "class-validator";
import { Like } from "../likes/like.entities";

@ObjectType()
@Entity()
export class Cat extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  @IsEmail({}, { message: "Format d'email invalide" })
  email: string;

  @Field()
  @Column()
  @IsString()
  @Length(6, 100, {
    message: "Le mot de passe doit être compris entre 6 et 100 caractères",
  })
  password: string;

  @Field()
  @Column()
  @IsString()
  @Length(2, 50, {
    message: "Le nom doit être compris entre 2 et 50 caractères",
  })
  name: string;

  @Field()
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(0, 255, { message: "La description ne peut dépasser 255 caratères" })
  description: string;

  @Field()
  @Column({ nullable: true })
  @IsOptional()
  @IsDate()
  birthday: Date;

  @Field()
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @IsIn(["mâle", "femelle", "autre"], {
    message: "Le sexe doit être 'mâle', 'femelle', or 'autre'",
  })
  sexe: string;

  @Field()
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  hair_color: string;

  @Field()
  @Column({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: "L'image doit avoir une URL valide" })
  profile_picture: string;

  @Field()
  @Column({ type: "datetime", nullable: true })
  @IsOptional()
  @IsDate()
  available: Date;

  @Field()
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  city: string;

  @Field()
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  breed: string;

  @Field()
  @Column({ default: "user" })
  @IsString()
  role: string;

  @OneToMany(() => Like, (like) => like.cat_id1)
  likedCats: Like[];

  @OneToMany(() => Like, (like) => like.cat_id2)
  likedBy: Like[];
}
