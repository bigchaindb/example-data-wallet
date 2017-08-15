import { connect } from 'react-redux'

import { generateMnemonic, setSeed } from '../actions'
import PassphraseForm from '../components/Passphrase'


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

)(PassphraseForm)
