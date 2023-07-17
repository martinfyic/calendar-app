import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
	CalendarEvent,
	CalendarModal,
	FabAddNew,
	FabDelete,
	Navbar,
} from '../components';
import { localizer, getMessagesES } from '../../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {
	const { user } = useAuthStore();

	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'week'
	);

	const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

	const { openDateModal } = useUiStore();

	const eventStyleGetter = event => {
		const isActivUserEvent =
			user.uid === event.user._id || user.uid === event.user.uid;

		const style = {
			backgroundColor: isActivUserEvent ? '#347CF7' : '#465660',
			borderRadius: '5px',
			opacity: 0.8,
			color: 'white',
		};

		return {
			style,
		};
	};

	const onDoubleClick = () => {
		openDateModal();
	};

	const onSelect = event => {
		setActiveEvent(event);
	};

	const onViewChange = event => {
		localStorage.setItem('lastView', event);
		setLastView(event);
	};

	useEffect(() => {
		startLoadingEvents();
	}, []);

	return (
		<>
			<Navbar />

			<Calendar
				culture='es'
				defaultView={lastView}
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 'calc( 100vh - 80px )' }}
				messages={getMessagesES()}
				eventPropGetter={eventStyleGetter}
				components={{
					event: CalendarEvent,
				}}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelect}
				onView={onViewChange}
			/>

			<CalendarModal />
			<FabDelete />
			<FabAddNew />
		</>
	);
};
