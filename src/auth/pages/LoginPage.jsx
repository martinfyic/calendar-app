import { useForm } from '../../hooks';
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
		console.log({ loginEmail, loginPassword });
	};

	const registerSubmit = event => {
		event.preventDefault();
		console.log({
			registerName,
			registerEmail,
			registerPassword,
			registerPassword2,
		});
	};

	return (
		<div className='container login-container'>
			<div className='row'>
				<div className='col-md-6 login-form-1'>
					<h3>Ingreso</h3>
					<form onSubmit={loginSubmit}>
						<div className='form-group mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Correo'
								name='loginEmail'
								value={loginEmail}
								onChange={onLoginInput}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='password'
								className='form-control'
								placeholder='Contraseña'
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
					<h3>Registro</h3>
					<form onSubmit={registerSubmit}>
						<div className='form-group mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Nombre'
								name='registerName'
								value={registerName}
								onChange={onRegisterInput}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='email'
								className='form-control'
								placeholder='Correo'
								name='registerEmail'
								value={registerEmail}
								onChange={onRegisterInput}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='password'
								className='form-control'
								placeholder='Contraseña'
								name='registerPassword'
								value={registerPassword}
								onChange={onRegisterInput}
							/>
						</div>

						<div className='form-group mb-2'>
							<input
								type='password'
								className='form-control'
								placeholder='Repita la contraseña'
								name='registerPassword2'
								value={registerPassword2}
								onChange={onRegisterInput}
							/>
						</div>

						<div className='d-flex justify-content-center align-items-center'>
							<input
								type='submit'
								className='btnSubmit'
								value='Crear cuenta'
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
