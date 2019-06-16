import React, { Component } from 'react'


export default class Show extends Component {
    render() {
        const prefix = 'www.'
        const { children} = this.props
        return (
            <>
                {children(prefix)}
            </>
        )
    }
}
