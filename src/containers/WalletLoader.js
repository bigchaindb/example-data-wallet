import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Wallet from '../components/Wallet'
import {
    mapPublicKeyToProfile,
    submitDatastream,
} from '../actions/index'

export default connect(

    (state, ownProps) => ({
        ...mapPublicKeyToProfile(ownProps.match.params.publicKey, state),
        datastreams: Object.values(state.datastreams),
        publicKey: ownProps.match.params.publicKey,
    }),

    dispatch => ({
        onMount: () => {},
        handleCreateDatastream: (value) => dispatch(submitDatastream(value)),
        handleClickDatastream: (txId) => dispatch(push(`/datastreams/${txId}`))
    })

)(Wallet)
