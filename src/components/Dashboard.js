import React from 'react'
import { Button } from 'semantic-ui-react'

import DatastreamCard from './DatastreamCard'


const Dashboard = (
    {
        name,
        publicKey,
        datastreams,
        handleCreateDatastream,
        handleClickDatastream
    }) => (
    <div>
        <h1>{name}</h1>
        <h3>{publicKey}</h3>
        <hr/>
        <div>
            <Button
                type='button'
                onClick={() => handleCreateDatastream('#B581CF')}>
                Generate a datastream
            </Button>
            <div className="datastream-container">
                <div className="datastream-grid">
                    {
                        datastreams.map(datastream =>
                            <DatastreamCard
                                datastream={datastream}
                                onClick={() => handleClickDatastream(datastream._txId, '#39BA91')}
                                key={datastream._txId}/>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
)

export default Dashboard
