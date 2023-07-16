import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

const loginFormFields = {
	loginEmail: '',
	loginPassword: '',
};

const registerFormFields = {
	registerName: '',
	registerEmail: '',
	registerPassword: '',
	registerPassword2: '',
};

export const LoginPage = () => {
	const { startlogin, errorMessage, startRegister } = useAuthStore();

	const {
		loginEmail,
		loginPassword,
		onInputChange: onLoginInput,
	} = useForm(loginFormFields);

	const {
		registerName,
		registerEmail,
		registerPassword,
		registerPassword2,
		onInputChange: onRegisterInput,
	} = useForm(registerFormFields);

	const loginSubmit = event => {
		event.preventDefault();
		startlogin({ email: loginEmail, password: loginPassword });
	};

	const registerSubmit = event => {
		event.preventDefault();
		if (registerPassword !== registerPassword2) {
			Swal.fire('Registration failed', 'Passwords are not the same', 'error');
		}

		startRegister({
			name: registerName,
			email: registerEmail,
			password: registerPassword,
		});
	};

	useEffect(() => {
		if (errorMessage !== undefined) {
			Swal.fire('Authentication failed', errorMessage, 'error');
		}
	}, [errorMessage]);

	return (
		<div className='container login-container'>
			<div className='row'>
				<div className='col-md-6 login-form-1'>
					<h3>Sign In</h3>
					<form onSubmit={loginSubmit}>
						<div className='form-group mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Email'
								name='loginEmail'
								value={loginEmail}
								onChange={onLoginInput}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='password'
								className='form-control'
								placeholder='Password'
								name='loginPassword'
								value={loginPassword}
								onChange={onLoginInput}
							/>
						</div>
						<div className='d-flex justify-content-center align-items-center'>
							<input
								type='submit'
								className='btnSubmit'
								value='Login'
							/>
						</div>
					</form>
				</div>

				<div className='col-md-6 login-form-2'>
					<h3>Sign Up</h3>
					<form onSubmit={registerSubmit}>
						<div className='form-group mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Name'
								name='registerName'
								value={registerName}
								onChange={onRegisterInput}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='email'
								className='form-control'
								placeholder='Email'
								name='registerEmail'
								value={registerEmail}
								onChange={onRegisterInput}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='password'
								className='form-control'
								placeholder='Password'
								name='registerPassword'
								value={registerPassword}
								onChange={onRegisterInput}
							/>
						</div>

						<div className='form-group mb-2'>
							<input
								type='password'
								className='form-control'
								placeholder='Repeat password'
								name='registerPassword2'
								value={registerPassword2}
								onChange={onRegisterInput}
							/>
						</div>

						<div className='d-flex justify-content-center align-items-center'>
							<input
								type='submit'
								className='btnSubmit'
								value='Create Account'
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
