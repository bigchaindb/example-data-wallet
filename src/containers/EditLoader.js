import { connect } from 'react-redux'

import { editProfile } from '../actions'
import EditForm from '../components/Edit'


export default connect(

    state => ({
        initialValues: state.identity.profile
    }),

    dispatch => ({
        onSubmit: values => {
            dispatch(editProfile(values))
        }
    })

)(EditForm)
