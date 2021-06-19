const API_URL =
    process.env.NODE_ENV === 'production' ? 'https://play-helper-api.herokuapp.com' : 'http://localhost:3001';

const urls = {
    signup: `${API_URL}/signup`,
    login: `${API_URL}/login`,
    srq: `${API_URL}/srq`,
    solution: `${API_URL}/solutions`,
    healthcheck: `${API_URL}/healthcheck`,
    settings: `${API_URL}/user/settings`,
    getUser: `${API_URL}/user/settings`,
};

export default urls;
