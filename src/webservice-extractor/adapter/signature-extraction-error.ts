import { WebServiceErrorCode } from '../interfaces/schema-extractor.interfaces';

/**
 * Failure raised by the isolated single-service PHP extractor, carrying a structured error code.
 */
export class SignatureExtractionError extends Error {
    /** Machine-readable failure classification */
    public readonly code: WebServiceErrorCode;

    /**
     * @param {string} message - Human-readable message.
     * @param {WebServiceErrorCode} code - Structured error code.
     */
    constructor(message: string, code: WebServiceErrorCode) {
        super(message);
        this.name = 'SignatureExtractionError';
        this.code = code;
    }
}
