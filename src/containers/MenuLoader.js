import { connect } from 'react-redux'
import AppMenu from '../components/Menu'
import { mapPublicKeyToProfile } from '../actions/index'

export default connect(
    state => ({
        ...mapPublicKeyToProfile(state.identity.keypair.publicKey, state),
        publicKey: state.identity.keypair.publicKey
    })
)(AppMenu)
