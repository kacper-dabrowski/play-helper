export const flyFromLeft = () => ({
    initial: { translateX: '-150vh', translateY: '-50%' },
    animate: { translateX: '-50%', translateY: '-50%' },
    exit: { translateX: '-150vh', translateY: '-50%' },
});

export const fadeInOut = () => ({
    animate: { opacity: 1 },
    exit: { opacity: 0 },
});
