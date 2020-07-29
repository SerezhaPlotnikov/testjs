import {
	FETCH_REQUEST,
	FETCH_SUCCESS,
	FETCH_ERROR,
	ADD_POST,
	FILTER_USERS,
	BACK_USERS,
} from './consts';

const initialState = {
	data: [],
	loading: false,
	filterData: [],
	filter: false,
	error: undefined,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_REQUEST: {
			return { ...state, loading: true, filter: false };
		}
		case FETCH_SUCCESS: {
			return { ...state, loading: false, filter: false, data: action.data };
		}
		case FETCH_ERROR: {
			return { ...state, loading: false, filter: false, error: 'Error' };
		}
		case ADD_POST: {
			return {
				...state,
				loading: false,
				filter: false,
				data: [action.post, ...state.data],
			};
		}
		case FILTER_USERS: {
			return {
				...state,
				loading: false,
				filter: true,
				filterData: [
					...state.data.filter((item) => {
						return item['firstName'].includes(action.search);
					}),
				],
			};
		}
		case BACK_USERS: {
			return { ...state, loading: false, filter: false, data: [...state.data] };
		}
		default:
			return state;
	}
};

export { reducer as mainReducer };
