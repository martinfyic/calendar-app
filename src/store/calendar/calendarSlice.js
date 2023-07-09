import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
	_id: new Date().getTime(),
	title: 'Practica Redux',
	notes: 'Hay que meterle',
	start: new Date(),
	end: addHours(new Date(), 2),
	bgColor: '#fafafa',
	user: {
		_id: '12332323',
		name: 'Martin',
	},
};

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState: {
		events: [tempEvent],
		activeEvents: null,
	},
	reducers: {
		onSetActiveEvent: (state, { payload }) => {
			state.activeEvents = payload;
		},
	},
});

export const { onSetActiveEvent } = calendarSlice.actions;
