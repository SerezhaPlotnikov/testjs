import React, { useState } from 'react';
import AddPostBox from '../containers/AddUser';
import ReactPaginate from 'react-paginate';

const MainInfo = (props) => {
	return (
		<div>
			<AddPostBox />
			<MainInfoBox {...props} />
		</div>
	);
};

const MainInfoBox = ({
	data,
	displayData,
	loading,
	filter,
	onSort,
	SortMode,
	SortName,
	FilterUsers,
	filterData,
	pageCount,
	PageClick,
	handlePageClick,
}) => {
	const [selected, setSelected] = useState('');
	const [value, setValue] = useState('');
	const valueHandler = (e) => {
		setValue(e.target.value);
	};
	return (
		<>
			<div>
				<button onClick={() => FilterUsers(value)}>Search</button>
				<input type='text' value={value} onChange={valueHandler} />
			</div>
			<table>
				<thead>
					<tr>
						<th onClick={() => onSort('id')}>
							id{SortName === 'id' ? <small>{SortMode}</small> : null}
						</th>
						<th onClick={() => onSort('firstName')}>
							firstName
							{SortName === 'firstName' ? <small>{SortMode}</small> : null}
						</th>
						<th onClick={() => onSort('lastName')}>
							lastName
							{SortName === 'lastName' ? <small>{SortMode}</small> : null}
						</th>
						<th onClick={() => onSort('email')}>
							email{SortName === 'email' ? <small>{SortMode}</small> : null}
						</th>
						<th onClick={() => onSort('phone')}>
							phone{SortName === 'phone' ? <small>{SortMode}</small> : null}
						</th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<tr>
							<td>...Loading</td>
						</tr>
					) : filter ? (
						filterData.map((item) => (
							<tr
								key={item.id + item.firstName}
								onClick={() => setSelected(item)}
							>
								<td>{item.id}</td>
								<td>{item.firstName}</td>
								<td>{item.lastName}</td>
								<td>{item.email}</td>
								<td>{item.phone}</td>
							</tr>
						))
					) : (
						displayData.map((item) => (
							<tr
								key={item.id + item.firstName}
								onClick={() => setSelected(item)}
							>
								<td>{item.id}</td>
								<td>{item.firstName}</td>
								<td>{item.lastName}</td>
								<td>{item.email}</td>
								<td>{item.phone}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			{data.length > 50 && (
				<ReactPaginate
					previousLabel={'previous'}
					nextLabel={'next'}
					breakLabel={'...'}
					breakClassName={'break-me'}
					pageCount={pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={PageClick}
					containerClassName={'pagination'}
					subContainerClassName={'pages pagination'}
					activeClassName={'active'}
					forcePage={handlePageClick}
				/>
			)}
			{selected ? <DetailsUser user={selected} /> : null}
		</>
	);
};

const DetailsUser = ({ user }) => {
	return (
		<div>
			<div>
				Выбран пользователь <b>{user.firstName}</b>
			</div>
			<div>
				Описание:
				<textarea defaultValue={user.description} />
			</div>
			<div>
				Адрес проживания: <b>{user.address.streetAddress}</b>
			</div>
			<div>
				Город: <b>{user.address.city}</b>
			</div>
			<div>
				Провинция/штат: <b>{user.address.state}</b>
			</div>
			<div>
				Индекс: <b>{user.address.zip}</b>
			</div>
		</div>
	);
};

export default MainInfo;
