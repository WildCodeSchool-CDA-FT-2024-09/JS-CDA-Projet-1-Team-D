import { Field, InputType } from "type-graphql";
import { Cat } from "./cat.entities";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

@InputType()
export class LogginInfosInput implements Partial<Cat> {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class catCreationInput extends Cat {
  @Field()
  @IsNotEmpty({ message: "Le champ 'name' est requis." })
  name: string;

  @Field()
  @IsNotEmpty({ message: "Veuillez renseigner un email." })
  @IsEmail({}, { message: "Email invalide" })
  email: string;

  @Field()
  @IsNotEmpty({ message: "Le mot de passe est requis" })
  @Length(8, 32, {
    message: "Le mot de passe doit faire entre 8 et 32 caractères",
  })
  password: string;

  @Field({ nullable: true })
  surname: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  birthday: Date;

  @Field({ nullable: true })
  sexe: string;

  @Field({ nullable: true })
  hair_color: string;

  @Field({ nullable: true })
  profile_picture: string;

  @Field({ nullable: true })
  available: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  breed: string;
}
