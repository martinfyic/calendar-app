import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {
	const { startDeletingEvent, hasEventSelected } = useCalendarStore();
	const { isDateModalOpen } = useUiStore();

	const handleDelete = () => {
		startDeletingEvent();
	};

	console.log(isDateModalOpen);
	return (
		<button
			onClick={handleDelete}
			className='btn btn-danger fab-danger'
			style={{
				display: hasEventSelected & !isDateModalOpen ? '' : 'none',
			}}
		>
			<i className='fas fa-trash-alt' />
		</button>
	);
};
