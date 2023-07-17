import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState: {
		isLoadingEvents: true,
		events: [],
		activeEvents: null,
	},
	reducers: {
		onSetActiveEvent: (state, { payload }) => {
			state.activeEvents = payload;
		},
		onAddNewEvent: (state, { payload }) => {
			state.events.push(payload);
			state.activeEvents = null;
		},
		onUpdateEvent: (state, { payload }) => {
			state.events = state.events.map(event => {
				if (event.id === payload.id) {
					return payload;
				}

				return event;
			});
		},
		onDeleteEvent: state => {
			if (state.activeEvents) {
				state.events = state.events.filter(
					event => event.id !== state.activeEvents.id
				);
				state.activeEvents = null;
			}
		},
		onLoadEvents: (state, { payload = [] }) => {
			state.isLoadingEvents = false;
			payload.forEach(event => {
				const exist = state.events.some(dbEvent => dbEvent.id === event.id);
				if (!exist) {
					state.events.push(event);
				}
			});
		},
		onLogoutCalendar: state => {
			state.isLoadingEvents = true;
			state.events = [];
			state.activeEvents = null;
		},
	},
});

export const {
	onAddNewEvent,
	onDeleteEvent,
	onLoadEvents,
	onLogoutCalendar,
	onSetActiveEvent,
	onUpdateEvent,
} = calendarSlice.actions;
