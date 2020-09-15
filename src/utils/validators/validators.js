export const isNumber = (value) => {
    if (typeof (+value) === 'number' && isFinite(value)) return "";

    return 'id должно быть числом.';
}

export const isEmail = (value) => {
    if (value.indexOf('@') !== -1) return "";

    return 'email должен содержать @.';
}
