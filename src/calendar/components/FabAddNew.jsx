import { addHours } from 'date-fns';
import { useUiStore, useCalendarStore } from '../../hooks';

export const FabAddNew = () => {
	const { openDateModal } = useUiStore();
	const { setActiveEvent } = useCalendarStore();

	const handleNewDate = () => {
		setActiveEvent({
			title: '',
			notes: '',
			start: new Date(),
			end: addHours(new Date(), 2),
			bgColor: '#fafafa',
			user: {
				_id: '12332323',
				name: 'Martin',
			},
		});
		openDateModal();
	};

	return (
		<button
			onClick={handleNewDate}
			className='btn btn-primary fab'
		>
			<i className='fas fa-plus' />
		</button>
	);
};
