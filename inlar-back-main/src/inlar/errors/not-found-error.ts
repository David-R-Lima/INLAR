import { error } from "src/core/error";

export class NotFoundError extends Error implements error {
    constructor(message: string) {
        super(message);
    }
}