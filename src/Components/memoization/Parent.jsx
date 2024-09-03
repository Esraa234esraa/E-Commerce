import React, { useMemo, useState } from 'react';

export default function Parent() {
  let [counter, setCounter] = useState(0);
  let [notes, setNotes] = useState([]); // تأكد من أن notes هي مصفوفة فارغة
  let val =useMemo(() => { return calc(counter); }, [counter])
  function addNote() {
    setNotes(prevNotes => [...prevNotes, 'new note']); // نسخ المصفوفة الحالية وإضافة ملاحظة جديدة
  }

  function increase() {
    setCounter(counter => counter + 1);
  }
  function calc(num) {
    console.log('render calc');

    for (let i = 0; i < 100; i++) {
      num += 1
    }
    return num
  }
  return (
    <div className='container'>
      <h1>val: {val}</h1>
      <h1>Counter: {counter}</h1>
      <button onClick={increase}>Increase</button>
      <hr />
      <button onClick={addNote}>+ addnote</button>
      <ul>
        {notes.map((note, index) => {
          return <li key={index}>{note}</li>;
        })}
      </ul>
    </div>
  );
}
