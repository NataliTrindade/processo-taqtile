export const validateEmail = (value: string): string => {
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (value.length === 0) return 'O campo de e-mail não pode estar vazio.';
    if (!emailRegex.test(value)) return 'Por favor, insira um endereço de e-mail válido.';
    return '';
}

export const validatePassword = (value: string): string => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;
    if (value.length === 0) return 'O campo de senha não pode estar vazio.';
    if (!passwordRegex.test(value)) return 'A senha deve conter pelo menos uma letra e um dígito, e ter no mínimo 7 caracteres.';
    return '';
};