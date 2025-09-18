import { isValidApplication } from "./utils";
import { createSupportMailto } from './utils';
import { SUPPORT_EMAIL } from '../constants/constants';

describe('isValidApplication', () => {
    const validApplicant = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        phone: '1234567890',
    };

    const invalidApplicant = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    };

    it('Should return true for valid applicant', () => {
        expect(isValidApplication(validApplicant)).toBe(true);
    });

    it('Should return false for invalid applicant', () => {
        expect(isValidApplication(invalidApplicant)).toBe(false);
    });
});

describe('createSupportMailto', () => {
    it('Should return a mailto link with encoded subject and body', () => {
        const error = "Something went wrong!";
        const t = (key: string, options?: any) => {
            if (key === "supportEmailSubject") return "API Failure in Nesto App";
            if (key === "supportEmailBody") return `Error details:\n\n${options?.error}`;
            return key;
        };

        const result = createSupportMailto(error, t);

        const expectedSubject = encodeURIComponent("API Failure in Nesto App");
        const expectedBody = encodeURIComponent(`Error details:\n\n${error}`);
        const expectedMailto = `mailto:${SUPPORT_EMAIL}?subject=${expectedSubject}&body=${expectedBody}`;

        expect(result).toBe(expectedMailto);
    });
});