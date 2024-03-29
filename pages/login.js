import React from 'react';
import 'isomorphic-fetch';
import {Button, Checkbox, Form} from 'semantic-ui-react'
import Layout from '../components/Layout'

const FormExampleForm = () => (
	<Layout>
		<Form>
			<Form.Field>
				<label>User Name</label>
				<input placeholder='Enter User Name'/>
			</Form.Field>
			<Form.Field>
				<label>Password</label>
				<input placeholder='Enter Password'/>
			</Form.Field>
			<Form.Field>
				<Checkbox label='I agree to the Terms and Conditions'/>
			</Form.Field>
			<Button type='submit'>Submit</Button>
		</Form>
	</Layout>
)

export default FormExampleForm
