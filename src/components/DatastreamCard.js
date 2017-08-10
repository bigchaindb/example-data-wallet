import React from 'react'
import { Button } from 'semantic-ui-react'


const DatastreamCard = ({ datastream, onClick }) => (
    <div
        className="datastream-item-container"
        style={{ backgroundColor: datastream.metaData.value }}
        onClick={onClick}>
        <div className="datastream-item">
            {datastream._txId}
            {datastream.metaData.time}
        </div>
    </div>
)

export default DatastreamCard
