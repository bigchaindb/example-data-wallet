import { connect } from 'react-redux'

import { editProfile } from '../actions'
import EditProfileForm from '../components/EditProfile'


export default connect(

    state => ({
        initialValues: state.identity.profile
    }),

    dispatch => ({
        onSubmit: values => {
            dispatch(editProfile(values))
        }
    })

)(EditProfileForm)
