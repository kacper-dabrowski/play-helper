module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',
        '\\.(svg|png|jpg)$': '<rootDir>/cssTestMock.js',
        ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/cssTestMock.js",

    },
    transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
