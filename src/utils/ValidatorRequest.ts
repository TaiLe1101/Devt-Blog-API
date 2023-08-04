/* eslint-disable @typescript-eslint/no-explicit-any */

export class ValidateRequest {
    isNotEmpty(data: any) {
        if (typeof data === 'undefined' || data === null) {
            return false;
        }
        return true;
    }

    isEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}
