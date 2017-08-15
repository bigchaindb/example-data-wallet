import { connect } from 'react-redux'
import { getTransaction } from '../bdb'
import Datastream from '../components/Datastream'
import {
    editDatastream
} from '../actions/index'

export default connect(

    (state, ownProps) => {
        const { transactionId } = ownProps.match.params
        getTransaction(transactionId)
        return {
            datastream: state.datastreams[transactionId]
        }
    },

    dispatch => ({
        onMount: () => {},
        onClick: (txId, value) => dispatch(editDatastream(txId, value))
    })

)(Datastream)
