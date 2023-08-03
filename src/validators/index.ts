export function isStringEmpty(
    listString: (string | undefined | number)[]
): boolean {
    return listString.some(
        (str) =>
            str === undefined ||
            str === null ||
            str === '' ||
            (typeof str === 'string' && !str.trim())
    );
}

export function isNumber(number: number): boolean {
    return !isNaN(number);
}

export function isPositiveNumber(number: number): boolean {
    return number > 0;
}

export function isEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function isMinLength(string: string, minLength: number): boolean {
    return string.length >= minLength;
}

export function isVerifyPassword(
    password: string,
    verifyPassword: string
): boolean {
    return password === verifyPassword;
}

type Options = {
    unPositiveNumber?: boolean;
};

export function validateValues(
    values: (string | number | undefined | null)[],
    options?: Options
): boolean {
    let isValid = false;

    values.forEach((value) => {
        if (typeof value === 'string') {
            if (value.trim().length <= 0 || value.trim() === '') {
                isValid = true;
                return;
            }
        } else if (typeof value === 'undefined' || value === null) {
            isValid = true;
        } else if (typeof value === 'number') {
            if (options?.unPositiveNumber) {
                if (!isPositiveNumber(value)) {
                    isValid = true;
                    return;
                }
            }
            if (!isNumber(value)) {
                isValid = true;
                return;
            }
        }
    });

    return isValid;
}
