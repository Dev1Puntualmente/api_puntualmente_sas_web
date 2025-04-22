import { Expose, Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  Min,
  IsString,
  IsEmail,
  Length,
  IsBoolean,
} from "class-validator";
import defaultValidationOptions from "../../contact/utils/defaultValidationOptions";

export class PaymentCreateDTO {
  @Expose()
  @IsNotEmpty(defaultValidationOptions('El nombre es requerido'))
  @IsString(defaultValidationOptions('El nombre debe ser un texto'))
  @Length(1, 255, defaultValidationOptions('El nombre debe tener entre 1 y 255 caracteres'))
  name: string;

  @Expose()
  @IsNotEmpty(defaultValidationOptions('El email es requerido'))
  @IsEmail({}, defaultValidationOptions('El email debe tener un formato válido'))
  email: string;

  @Expose()
  @IsNotEmpty(defaultValidationOptions('El teléfono es requerido'))
  @IsString(defaultValidationOptions('El teléfono debe ser un texto'))
  @Length(10, 10, defaultValidationOptions("El número de teléfono debe contener 10 digitos"))
  phone: string;

  @Expose()
  @IsNotEmpty(defaultValidationOptions('El número de documento es requerido'))
  @IsString(defaultValidationOptions('El número de documento debe ser un texto'))
  documentNumber: string;

  @Expose()
  @IsNotEmpty(defaultValidationOptions('El monto es requerido'))
  @IsNumber({}, defaultValidationOptions('El monto debe ser un número'))
  @Min(0.01, defaultValidationOptions('El monto debe ser mayor a 0'))
  amount: number;


  @Expose()
  @IsNotEmpty(defaultValidationOptions('La referencia de pago es requerida'))
  @IsString(defaultValidationOptions('La referencia de pago debe ser un texto'))
  paymentReference: string;

  @Expose()
  @IsNotEmpty(defaultValidationOptions(""))
  @IsBoolean(defaultValidationOptions('Debe ser un boolean'))
  terms: boolean;
}

export default class PaymentDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  documentNumber: string;

  @Expose()
  amount: number;

  @Expose()
  paymentReference: string;

  @Expose()
  terms: boolean;

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