import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogOut, onLogin } from '../store';

export const useAuthStore = () => {
	const { status, user, errorMessage } = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const startlogin = async ({ email, password }) => {
		dispatch(onChecking());
		try {
			const { data } = await calendarApi.post('/auth', { email, password });
			localStorage.setItem('token', data.user.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(onLogin({ name: data.user.name, uid: data.user.uid }));
		} catch (error) {
			dispatch(onLogOut('Incorrect credentials'));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const startRegister = async ({ name, email, password }) => {
		dispatch(onChecking());
		try {
			const { data } = await calendarApi.post('/auth/new', {
				name,
				email,
				password,
			});
			localStorage.setItem('token', data.user.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(onLogin({ name: data.user.name, uid: data.user.uid }));
		} catch (error) {
			console.log(error);
			dispatch(onLogOut(error.response.data?.msg || 'Registration failed'));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const startCheckAuthToken = async () => {
		const token = localStorage.getItem('token');
		if (!token) return dispatch(onLogOut());

		try {
			const { data } = await calendarApi.get('auth/renew');
			localStorage.setItem('token', data.user.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(onLogin({ name: data.user.name, uid: data.user.uid }));
		} catch (error) {
			localStorage.clear();
			dispatch(onLogOut());
		}
	};

	const startLogout = () => {
		localStorage.clear();
		dispatch(onLogOut());
	};

	return {
		//* Propiedades
		errorMessage,
		status,
		user,
		//* Metodos
		startCheckAuthToken,
		startLogout,
		startlogin,
		startRegister,
	};
};
