import { Expose, Transform } from "class-transformer";
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsBoolean,  
  Length,
  Matches,
} from "class-validator";

import defaultValidationOptions from "../utils/defaultValidationOptions";


export class ContactCreateDTO {
  @Expose()
  @IsNotEmpty(defaultValidationOptions('El nombre es requerido'))
  @IsString(defaultValidationOptions('El nombre debe ser un texto'))
  @Length(2, 100, defaultValidationOptions('El nombre debe tener entre 2 y 100 caracteres'))
  @Matches(/^[a-zA-ZÀ-ÿ\s]+$/, defaultValidationOptions('El nombre solo debe contener letras y espacios'))
  name: string;

  @Expose()
  @IsNotEmpty(defaultValidationOptions('El correo electrónico es requerido'))
  @IsEmail({}, defaultValidationOptions('El formato de correo electrónico es inválido'))
  @Length(5, 255, defaultValidationOptions('El correo debe tener entre 5 y 255 caracteres'))
  email: string;

  @Expose()
  @IsNotEmpty(defaultValidationOptions('El asunto es requerido'))
  @IsString(defaultValidationOptions('El asunto debe ser un texto'))
  @Length(3, 255, defaultValidationOptions('El asunto debe tener entre 3 y 255 caracteres'))
  subject: string;

  @Expose()
  @IsNotEmpty(defaultValidationOptions(""))
  @IsBoolean(defaultValidationOptions('Debe ser un boolean'))
  terms: boolean;

  @Expose()
  @IsNotEmpty(defaultValidationOptions('El mensaje es requerido'))
  @IsString(defaultValidationOptions('El mensaje debe ser un texto'))
  @Length(10, 1000, defaultValidationOptions('El mensaje debe tener entre 10 y 1000 caracteres'))
  message: string;
}

export default class ContactDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  subject: string;

  @Expose()
  message: string;

  terms: boolean;

  @Expose()
  hasDeleted: boolean;

  @Expose()
  @Transform(({ value }) => {
    if (!value) return null;
    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) return null;
      
      return `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
    } catch (e) {
      return null;
    }
  })
  createdAt: string;

  @Expose()
  @Transform(({ value }) => {
    if (!value) return null;
    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) return null;
      
      return `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
    } catch (e) {
      return null;
    }
  })
  updatedAt: string;
}