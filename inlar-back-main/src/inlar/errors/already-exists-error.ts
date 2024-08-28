import { error } from "src/core/error";

export class AlreadyExistsError extends Error implements error {
    constructor(message: string) {
        super(message);
    }
}