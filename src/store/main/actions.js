import {
	FETCH_REQUEST,
	FETCH_ERROR,
	FETCH_SUCCESS,
	ADD_POST,
	FILTER_USERS,
	BACK_USERS,
} from './consts';

export const fetchRequest = (url) => ({ type: FETCH_REQUEST, url });
export const fetchSuccess = (data) => ({
	type: FETCH_SUCCESS,
	data,
});
export const fetchError = (message) => ({ type: FETCH_ERROR, message });

export const addPost = (post) => ({ type: ADD_POST, post });
export const filterUsers = (search) => ({ type: FILTER_USERS, search });
export const BackUsers = () => ({ type: BACK_USERS });
