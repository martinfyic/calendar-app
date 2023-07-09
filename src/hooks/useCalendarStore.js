import { useDispatch, useSelector } from 'react-redux';
import {
	onSetActiveEvent,
	onDeleteEvent,
	onAddNewEvent,
	onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvents } = useSelector(state => state.calendar);

	const setActiveEvent = calendarEvent => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const startSavingEvent = async calendarEvent => {
		if (calendarEvent._id) {
			dispatch(onUpdateEvent({ ...calendarEvent }));
		} else {
			dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
		}
	};

	const startDeletingEvent = () => {
		dispatch(onDeleteEvent());
	};

	return {
		//* Propiedades
		activeEvents,
		events,
		hasEventSelected: !!activeEvents,

		//* Metodos
		startDeletingEvent,
		setActiveEvent,
		startSavingEvent,
	};
};
