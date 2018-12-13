import { connect } from 'react-redux'

import { NewTransaction } from '../actions'
import NewTransactionForm from '../components/NewTransaction'


export default connect(

    state => ({
        initialValues : state.identity.profile        
    }),
    /* tis were da form connects to the router */
    dispatch => ({
        onSubmit: values => {
            dispatch(NewTransaction(values))
        },
        onChangeHandler: {}
    })

)(NewTransactionForm)
