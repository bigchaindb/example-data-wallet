import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import {
    mapPublicKeyToProfile,
    submitDatastream,
    editDatastream
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
        handleClickDatastream: (txId, value) => dispatch(editDatastream(txId, value))
    })

)(Dashboard)
