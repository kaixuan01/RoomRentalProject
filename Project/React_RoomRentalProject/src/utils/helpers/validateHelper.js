export const isObjectEmpty = (obj) => {
    return !obj || Object.keys(obj).length === 0;
};

export const areAllValuesEmpty = (obj) => {
    if (!obj || typeof obj !== 'object') {
        throw new Error('Input must be an object');
    }
    return Object.values(obj).every(value => value === '');
};
