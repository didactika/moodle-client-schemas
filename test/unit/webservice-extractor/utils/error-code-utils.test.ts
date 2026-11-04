import { resolveErrorCode, isWebServiceErrorCode } from '../../../../src/webservice-extractor/utils/error-code-utils';
import { SignatureExtractionError } from '../../../../src/webservice-extractor/adapter/signature-extraction-error';

describe('Unit Test: error-code-utils', () => {
    it('keeps the structured code carried by the error', () => {
        expect(resolveErrorCode(new SignatureExtractionError('boom', 'CLASS_NOT_FOUND'))).toBe('CLASS_NOT_FOUND');
        expect(resolveErrorCode({ code: 'PERMISSION_DENIED' })).toBe('PERMISSION_DENIED');
    });

    it('maps filesystem permission errnos to PERMISSION_DENIED', () => {
        expect(resolveErrorCode(Object.assign(new Error('x'), { code: 'EACCES' }))).toBe('PERMISSION_DENIED');
        expect(resolveErrorCode(Object.assign(new Error('x'), { code: 'EPERM' }))).toBe('PERMISSION_DENIED');
    });

    it('never inspects the message text', () => {
        expect(resolveErrorCode(new Error('EACCES: Permission denied'))).toBe('INTROSPECTION_FAILED');
        expect(resolveErrorCode(new Error("Class 'x' was not found in the Moodle codebase"))).toBe('INTROSPECTION_FAILED');
    });

    it('falls back to the provided code for unknown or missing codes', () => {
        expect(resolveErrorCode({ code: 'ENOENT' }, 'CLASS_NOT_FOUND')).toBe('CLASS_NOT_FOUND');
        expect(resolveErrorCode(null)).toBe('INTROSPECTION_FAILED');
        expect(resolveErrorCode('plain string')).toBe('INTROSPECTION_FAILED');
    });

    it('recognizes only known codes', () => {
        expect(isWebServiceErrorCode('CLASS_NOT_FOUND')).toBe(true);
        expect(isWebServiceErrorCode('NOT_A_CODE')).toBe(false);
        expect(isWebServiceErrorCode(3)).toBe(false);
    });
});
