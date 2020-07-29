import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { addPost } from '../store/main/actions';

const AddPostBox = (props) => {
	const [EditMode, setEditMode] = useState(false);
	const Submit = (post) => {
		props.addPost(post);
		setEditMode(false);
	};
	const Cancel = () => {
		setEditMode(false);
	};
	return (
		<div>
			{EditMode ? (
				<UsersReduxForm onSubmit={Submit} cancel={Cancel} />
			) : (
				<button onClick={() => setEditMode(true)}>Add User</button>
			)}
		</div>
	);
};

const UsersForm = (props) => {
	const { handleSubmit, pristine, submitting, cancel } = props;
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>ID</label>
				<div>
					<Field name='id' component='input' type='text' placeholder='ID' />
				</div>
			</div>
			<div>
				<label>First Name</label>
				<div>
					<Field
						name='firstName'
						component='input'
						type='text'
						placeholder='Fast Name'
					/>
				</div>
			</div>
			<div>
				<label>Last Name</label>
				<div>
					<Field
						name='lastName'
						component='input'
						type='lastName'
						placeholder='Last Name'
					/>
				</div>
			</div>
			<div>
				<label>Email</label>
				<div>
					<Field
						name='email'
						component='input'
						type='email'
						placeholder='Email'
					/>
				</div>
			</div>
			<div>
				<label>Phone</label>
				<div>
					<Field
						name='phone'
						component='input'
						type='phone '
						placeholder='Phone'
					/>
				</div>
			</div>
			<button type='submit' disabled={pristine || submitting}>
				Submit
			</button>
			<button onClick={cancel}>Cancel</button>
		</form>
	);
};
const UsersReduxForm = reduxForm({
	form: 'users',
})(UsersForm);

export default connect(undefined, { addPost })(AddPostBox);
