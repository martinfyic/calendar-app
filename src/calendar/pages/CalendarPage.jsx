import { useState } from 'react';

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
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {
	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'week'
	);

	const { events, setActiveEvent } = useCalendarStore();

	const { openDateModal } = useUiStore();

	const eventStyleGetter = () => {
		const style = {
			backgroundColor: '#347CF7',
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
