import React from 'react';

export interface JsonTextProps<T> {
    data: T;
}

const JsonText = <T extends object>({ data }: JsonTextProps<T>) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
);

export default JsonText;
