import { validate } from "class-validator";
import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance } from "class-transformer";

/**
 * Middleware de validación para DTOs
 * @param dtoClass Clase del DTO a validar
 * @returns Middleware que valida la petición contra el DTO
 */

const validationMiddleware = <T extends object>(dtoClass: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dtoObject = plainToInstance(dtoClass, req.body, {
                excludeExtraneousValues: true,
            });
            const errors = await validate(dtoObject, {
                whitelist: true,
                forbidNonWhitelisted: true
            });

            if (errors.length > 0) {
                const formattedErrors = errors.map(error => ({
                    property: error.property,
                    errors: error.constraints
                }));

                res.status(400).json({
                    message: "Validation failed",
                    errors: formattedErrors
                });
                return;
            }
            req.body = dtoObject;
            next();
        } catch (error) {
            res.status(500).json({
                message: "Internal server error during validation",
                error: (error instanceof Error) ? error.message : "Unknown error"
            });
        }
    };
};


export default validationMiddleware;