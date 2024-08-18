import { useCallback, useState } from 'react';

export const useInput = (initialData) => {
    const [value, setValue] = useState(initialData);

    const handler = useCallback((value, callback) => {
        setValue(value);
        if (callback && typeof callback === 'function') {
            callback(value);
        }
    }, []);

    return [value, handler];
};

export const useToggle = (initialData) => {
    const [value, setValue] = useState(initialData);

    const handler = useCallback((callback) => {
        setValue((prev) => {
            const newValue = !prev;
            if (callback && typeof callback === 'function') {
                callback(newValue);
            }
            return newValue;
        });
    }, []);

    return [value, handler];
};
