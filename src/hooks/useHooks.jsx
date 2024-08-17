import { useCallback, useState } from 'react';

export const useInput = ({ initialData }) => {
    const [value, setValue] = useState(initialData);

    const handler = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    return [value, handler];
};

export const useToggle = ({ initialData }) => {
    const [value, setValue] = useState(initialData);

    const handler = useCallback((e) => {
        setValue((prev) => !prev);
    }, []);

    return [value, handler];
};
