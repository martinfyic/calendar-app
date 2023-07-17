import { useDispatch, useSelector } from 'react-redux';
import {
	onAddNewEvent,
	onDeleteEvent,
	onLoadEvents,
	onSetActiveEvent,
	onUpdateEvent,
} from '../store';
import { calendarApi } from '../api';
import { convertDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvents } = useSelector(state => state.calendar);
	const { user } = useSelector(state => state.auth);

	const setActiveEvent = calendarEvent => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const startSavingEvent = async calendarEvent => {
		try {
			if (calendarEvent.id) {
				await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
				dispatch(onUpdateEvent({ ...calendarEvent, user }));
				return;
			}
			const { data } = await calendarApi.post('/events', calendarEvent);
			dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
		} catch (error) {
			console.log(error);
			Swal.fire('Failed to save', error.response.data?.msg, 'error');
		}
	};

	const startDeletingEvent = async () => {
		try {
			await calendarApi.delete(`/events/${activeEvents.id}`);
			dispatch(onDeleteEvent());
			Swal.fire(
				'Successfully removed',
				'The date was successfully removed',
				'success'
			);
		} catch (error) {
			console.log(error);
			Swal.fire('Failed to delete', error.response.data?.msg, 'error');
		}
	};

	const startLoadingEvents = async () => {
		try {
			const { data } = await calendarApi.get('/events');
			const events = convertDateEvents(data.events);
			dispatch(onLoadEvents(events));
		} catch (error) {
			console.log(error);
		}
	};

	return {
		//* Propiedades
		activeEvents,
		events,
		hasEventSelected: !!activeEvents,

		//* Metodos
		setActiveEvent,
		startDeletingEvent,
		startLoadingEvents,
		startSavingEvent,
	};
};
