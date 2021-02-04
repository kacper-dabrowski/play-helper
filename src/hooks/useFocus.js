import React from 'react';

const useFocus = () => {
    const focusOn = React.useRef();

    React.useEffect(() => {
        focusOn?.current.focus();
    }, [focusOn]);

    return focusOn;
};

export default useFocus;
