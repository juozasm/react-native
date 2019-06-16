import React from 'react'

function componentName(props) {
    return (
        <>
            {props.prefix}
            {props.text}  
            {props.number}
        </>
    )
}

export default componentName
