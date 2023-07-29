import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage, Loading } from '../calendar';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {
	const { status, startCheckAuthToken } = useAuthStore();

	useEffect(() => {
		startCheckAuthToken();
	}, []);

	if (status === 'checking') {
		return <Loading />;
	}
	return (
		<Routes>
			{status === 'not-authenticated' ? (
				<>
					<Route
						path='/auth/*'
						element={<LoginPage />}
					/>
					<Route
						path='*'
						element={<Navigate to='/auth/login' />}
					/>
				</>
			) : (
				<>
					<Route
						path='/'
						element={<CalendarPage />}
					/>
					<Route
						path='/*'
						element={<Navigate to='/' />}
					/>
				</>
			)}
		</Routes>
	);
};
