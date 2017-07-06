import { connect } from 'react-redux'
import Home from '../components/Home'
import { mapPublicKeyToProfile } from '../actions/index'

export default connect(
    state => ({
        ...mapPublicKeyToProfile(state.identity.keypair.publicKey, state)
    })
)(Home)
