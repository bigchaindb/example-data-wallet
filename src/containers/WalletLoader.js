import { connect } from 'react-redux'

import { generateMnemonic, setSeed } from '../actions'
import WalletForm from '../components/Wallet'


export default connect(

    state => ({
        ...state.async,
        initialValues: {
            seed: state.identity.seed,
        }

    }),

    dispatch => ({
        onSubmit: values => {
            dispatch(setSeed(values.seed))
        },

        onGenerateMnemonic: () => dispatch(generateMnemonic())
    })

)(WalletForm)
