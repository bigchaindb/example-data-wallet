import React from 'react'

import DatastreamCard from './DatastreamCard'


const Wallet = (
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
            <div className="datastream-container">
                <div className="datastream-grid">
                    <div
                        className="datastream-item-container datastream-item-add"
                        onClick={() => handleCreateDatastream(Math.random())}>
                        <div className="datastream-item">
                            +
                        </div>
                    </div>
                    {
                        datastreams.map(datastream =>
                            <DatastreamCard
                                datastream={datastream}
                                onClick={() => handleClickDatastream(datastream._assetId)}
                                key={datastream._txId}/>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
)

export default Wallet
