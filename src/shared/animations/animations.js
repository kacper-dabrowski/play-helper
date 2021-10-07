export const flyFromLeft = () => ({
    initial: { translateX: '-100vh' },
    animate: { translateX: '0%' },
    exit: { translateX: '-100vh' },
});

export const fadeInOut = () => ({
    animate: { opacity: 1 },
    exit: { opacity: 0 },
});
