import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from './../exceptions/http.exception'; // Adjust the import based on your project structure

function formatValidationErrors(errors: ValidationError[]): string {
    return errors
        .map(error => {
            if (error.constraints) {
                return Object.values(error.constraints).join(', ');
            }
            if (error.children && error.children.length > 0) {
                return formatValidationErrors(error.children);
            }
            return '';
        })
        .filter(message => message.length > 0) // Filter out empty messages
        .join(', ');
}

export function validationMiddleware(type: any): RequestHandler {
    return (req, res, next) => {
        validate(plainToInstance(type, req.body))
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = formatValidationErrors(errors);
                    return next(new HttpException(400, message));
                } else {
                    next();
                }
            })
            .catch(err => {
                next(new HttpException(500, 'Internal server error'));
            });
    };
}

