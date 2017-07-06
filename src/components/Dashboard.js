import React from 'react'

const Dashboard = ({ name, publicKey }) => (
    <div>
        <h1>{name}</h1>
        <h3>{publicKey}</h3>
        <hr/>
    </div>
)

export default Dashboard
