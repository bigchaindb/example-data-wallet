import React, { Component } from 'react'

export default class Dashboard extends Component {
    render() {
        const { name, publicKey } = this.props

        return (
            <div>
                <h1>{name}</h1>
                <h3>{publicKey}</h3>
                <hr/>
            </div>
        )
    }
}
