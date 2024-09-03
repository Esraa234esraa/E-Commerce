import React, { memo } from 'react'
function Text({ name }) {
    console.log('rerender');
    
    return (
        <div>Text {name}</div>
    )
}

export default memo(Text)