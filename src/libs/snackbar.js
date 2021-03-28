export const snackbarTypes = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

const snackbarConfig = (type) => ({
    style: {
        backgroundColor: type === snackbarTypes.ERROR ? '#e84545' : '#4bb543',
        color: 'white',
        fontFamily: 'sans-serif',
        fontSize: '20px',
        textAlign: 'center',
    },
});

export default snackbarConfig;
