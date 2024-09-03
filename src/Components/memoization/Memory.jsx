import React, { useMemo, useState } from 'react'
import Text from './Text';

export default function Memory() {

    let [counter, setCounter] = useState(0);
    let name = useMemo(() => { return { fName: 'esraa' } }, [])
    function increase() {
        setCounter(counter => counter + 1);
    }
    return (
        <div className='container'> <h1>Counter: {counter}</h1>
            <button onClick={increase}>Increase</button>
            <hr />
            <Text name={name.fName} /></div>
    )
}
