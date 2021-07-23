import { useEffect, useRef } from 'react';

const useFocus = () => {
    const focusOn = useRef();

    useEffect(() => {
        focusOn?.current.focus();
    }, [focusOn]);

    return focusOn;
};

export default useFocus;
