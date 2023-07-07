import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { Navbar } from '../components';
import { localizer, getMessagesES } from '../../helpers';

const events = [
	{
		title: 'cumpleanos de martin',
		notes: 'hay que organizar fiesta',
		start: new Date(),
		end: addHours(new Date(), 2),
		bgColor: '#fafafa',
		user: {
			_id: '12332323',
			name: 'Martin',
		},
	},
];

export const CalendarPage = () => {
	const eventStyleGetter = (event, start, end, isSelected) => {
		console.log({ event, start, end, isSelected });

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

	return (
		<>
			<Navbar />

			<Calendar
				culture='es'
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 'calc( 100vh - 80px )' }}
				messages={getMessagesES()}
				eventPropGetter={eventStyleGetter}
			/>
		</>
	);
};
