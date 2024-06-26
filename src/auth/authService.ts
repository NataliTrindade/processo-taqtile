export const saveToken = (token: string) => {
    return localStorage.setItem('token', token)
}

export const getToken = () => {
    return localStorage.getItem('token');
}