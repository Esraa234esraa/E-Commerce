import React, { createContext, useState } from 'react';

export let counter = createContext();

export default function CounterContextProvider({ children }) {
    let [myCount, setCount] = useState(0);

    function increase() {
        setCount(myCount + 1);
    }

    function decrease() {
        setCount(myCount - 1);
    }

    return (
        <counter.Provider value={{ myCount, increase, decrease }}>
            {children}
        </counter.Provider>
    );
}
