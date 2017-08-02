/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
/* eslint-enable no-unused-vars */

const Edit = ({ handleSubmit }) => (
    <div className="main--white">
        <h1>Edit your public profile</h1>
        <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Field>
                <label>New name</label>
                <Field name="name" component="input" required
                       type="text" placeholder='Your new name or company name' />
            </Form.Field>
            <Button primary type='submit'>Save</Button>
        </Form>
    </div>
)

Edit.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
}

const EditForm = reduxForm({
    form: 'edit'
})(Edit)


export default EditForm
