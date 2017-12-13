/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
/* eslint-enable no-unused-vars */

const NewTransaction = ({ handleSubmit }) => (
    <div className="main--white">
        <h1>Add a new Transaction Here</h1>
        <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Field>
                <label>Title</label>
                <Field name="title" component="input" required
                       type="text" placeholder='Something unique!' />
            </Form.Field>
            <Button primary type='submit'>Save</Button>
        </Form>
    </div>
)

NewTransaction.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
}

const NewTransactionForm = reduxForm({
    form: 'edit'
})(NewTransaction)

export default NewTransactionForm
