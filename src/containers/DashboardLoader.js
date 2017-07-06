import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import { mapPublicKeyToProfile } from '../actions/index'

export default connect(

    (state, ownProps) => ({
        ...mapPublicKeyToProfile(ownProps.match.params.publicKey, state),
        publicKey: ownProps.match.params.publicKey
    }),

    dispatch => ({
        onMount: () => {}
    })

)(Dashboard)
