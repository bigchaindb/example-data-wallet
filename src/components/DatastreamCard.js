import React from 'react'
import moment from 'moment'


const DatastreamCard = ({ datastream, onClick }) => (
    <div
        className="datastream-item-container"
        onClick={onClick}>
        <div className="datastream-item">
            <div className="datastream-item-card .datastream-item-card-header">
                { datastream._txId }
            </div>
            <div className="datastream-item-card datastream-item-card-body">
                <pre>{ datastream.metadata.payload ? 
                    datastream.metadata.payload.title : datastream.metadata.value }</pre>
            </div>
            <div className="datastream-item-card datastream-item-card-footer">
                {
                    moment
                        .unix(datastream.metadata.time / 1000)
                        .format('YYYY-MM-DD HH:mm:ss')
                }
            </div>
        </div>
    </div>
)
// eslint-disable-next-line


export default DatastreamCard


