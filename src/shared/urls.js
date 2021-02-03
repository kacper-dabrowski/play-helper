const API_URL =
    process.env.NODE_ENV === 'production' ? 'https://play-helper-api.herokuapp.com' : 'http://localhost:3001';

const urls = {
    signup: `${API_URL}/signup`,
    login: `${API_URL}/login`,
    srq: `${API_URL}/srq`,
};

export default urls;
