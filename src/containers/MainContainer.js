import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	fetchRequest,
	fetchSuccess,
	filterUsers,
	BackUsers,
} from '../store/main/actions';
import MainInfo from '../components/main';
import _ from 'lodash';

const large = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
const small = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;

const MainContainer = (props) => {
	const [handlePageClick, setHandlePageClick] = useState(0);
	const PageClick = ({ selected }) => setHandlePageClick(selected);
	const pageCount = Math.ceil(props.data.length / 50);
	const [SortName, setSortName] = useState('');
	const [SortMode, isSortMode] = useState('');
	const fetchData = (url) => {
		props.fetchRequest(url);
	};
	const FilterUsers = (search) => {
		if (!search) {
			return props.BackUsers();
		}
		return props.filterUsers(search), setHandlePageClick(0);
	};
	const onSort = (sort) => {
		setSortName(sort);
		setHandlePageClick(0);
		const data = props.data.concat();
		{
			SortMode === 'asc' ? isSortMode('desc') : isSortMode('asc');
		}
		let sortType = SortMode === 'asc' ? 'desc' : 'asc';
		const orderData = _.orderBy(data, sort, sortType);
		props.fetchSuccess(orderData);
	};
	const displayData = _.chunk(props.data, pageCount)[handlePageClick];
	return (
		<>
			{!props.loading && props.data.length === 0 ? (
				<div>
					<button onClick={() => fetchData(small)}>32</button>
					<button onClick={() => fetchData(large)}>1000</button>
				</div>
			) : (
				<MainInfo
					{...props}
					displayData={displayData}
					PageClick={PageClick}
					pageCount={pageCount}
					onSort={onSort}
					SortMode={SortMode}
					SortName={SortName}
					FilterUsers={FilterUsers}
					handlePageClick={handlePageClick}
				/>
			)}
		</>
	);
};

const mapStateToProps = ({ main }) => ({
	data: main.data,
	filterData: main.filterData,
	loading: main.loading,
	error: main.error,
	filter: main.filter,
});
const mapDispatchToProps = {
	fetchRequest,
	fetchSuccess,
	filterUsers,
	BackUsers,
};
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
