/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
import ReactMDE from 'redux-forms-markdown-editor';
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
            <div>
            <label>Bio</label>
            <Field
              name="bio"
              component={ReactMDE}
              placeholder="More info about yourself"
            />
          </div>
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
