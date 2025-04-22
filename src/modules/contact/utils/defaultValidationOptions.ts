import { ValidationOptions } from "class-validator";

const defaultValidationOptions = (message: string): ValidationOptions => ({
    message
});

export default defaultValidationOptions;