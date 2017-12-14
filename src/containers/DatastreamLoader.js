import { connect } from 'react-redux'
import { getTransaction } from '../bdb'
import Datastream from '../components/Datastream'
import {
    mapPublicKeyToProfile,
    editDatastream
} from '../actions/index'

export default connect(

    (state, ownProps) => {
        const { transactionId } = ownProps.match.params
        getTransaction(transactionId)
        var owner
        if(state.datastreams[transactionId]){
            // console.log(state.datastreams[transactionId]._pk)
            // var pk = state.datastreams[transactionId].provenance[0].from[0].owners_before[0]
            var pk = state.datastreams[transactionId]._pk
            owner = (mapPublicKeyToProfile(pk, state))
            owner.pk = pk
        }
        return {
            datastream: state.datastreams[transactionId],
            owner: owner
        }
    },

    dispatch => ({
        onMount: () => {},
        onClick: (txId, value) => dispatch(editDatastream(txId, value))
    })

)(Datastream)
