import { useDispatch, useSelector } from 'react-redux';
import { onSetActiveEvent } from '../store';

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvents } = useSelector(state => state.calendar);

	const SetActiveEvent = calendarEvent => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	return {
		//* Propiedades
		events,
		activeEvents,

		//* Metodos
		SetActiveEvent,
	};
};
