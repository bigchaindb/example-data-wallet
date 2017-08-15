/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
/* eslint-enable no-unused-vars */

const Profile = ({ handleSubmit }) => (
    <div className="full-page">
        <div className="main">
            <h1>Complete your public profile.</h1>

            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Field>
                    <label>Name</label>
                    <Field
                        name="name" component="input" required
                        type="text" placeholder='Your name or your company name' />
                </Form.Field>
                <Button primary type='submit'>Sign and submit</Button>
                <Button as='a' href='/logout'>Reset session</Button>
            </Form>
        </div>
    </div>
)

Profile.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
}

const ProfileForm = reduxForm({
    form: 'profile'
})(Profile)


export default ProfileForm
