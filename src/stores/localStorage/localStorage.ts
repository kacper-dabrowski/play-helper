interface UserInLocalStorage {
    token: string;
    expirationDate: Date;
    fullName: string;
    userId: string;
}

export const saveUserInLocalStorage = ({ token, expirationDate, fullName, userId }: UserInLocalStorage) => {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toString());
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('userId', userId);
};

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('fullName');
    localStorage.removeItem('userId');
};
