import { error } from "src/core/error";

export class InternalError extends Error implements error {
    constructor(message: string) {
        super(message);
    }
}