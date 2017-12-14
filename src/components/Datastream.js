import React, { Component } from 'react'
import moment from 'moment'


class Datastream extends Component {
    render() {
        const {
            datastream,
            owner,
            onClick
        } = this.props

        if (!datastream) {
            return (
                <div>
                    Loading...
                </div>
            )
        }

        return (
            <div className="datastream-container">
                <h3>{ datastream._assetId }</h3>
                <p>This Asset is owned by {owner.name}</p>
                <hr />
                <div
                    className="datastream-epoch datastream-epoch-add"
                    onClick={() => onClick(datastream._txId, Math.random())} >
                    + Generate randomish datapoint
                </div>
                {
                    datastream.provenance
                        .reverse()
                        .map(epoch => (
                            <div
                                className="datastream-epoch"
                                key={epoch._txId}>
                                <span>
                                    {
                                        moment
                                            .unix(epoch.metadata.time / 1000)
                                            .format('YYYY-MM-DD HH:mm:ss')
                                    }
                                </span>
                                <span> - { epoch._txId}</span>
                                <span className="datastream-epoch-data">{ epoch.metadata.value }</span>
                            </div>
                        ))
                }
            </div>
        )
    }
}

export default Datastream

