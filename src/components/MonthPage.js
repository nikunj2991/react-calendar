import React from 'react';
import PropTypes from 'prop-types';
import { daysInMonth } from '../helpers/monthHelpers';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class MonthPage extends React.Component {
	constructor(props) {
		super(props);
		this.createTable = this.createTable.bind(this);
		this.renderTBody = this.renderTBody.bind(this);
		this.setMonthPageParams = this.setMonthPageParams.bind(this);
	}

	setMonthPageParams() {
		this.month = this.props.month;
		this.year = this.props.year;
		this.mappedDate = 1;
		this.mappingOn = false;
		this.date = new Date(this.props.year, this.props.month, 1);
		this.daysInMonth = daysInMonth(this.props.year, this.props.month+1);
		this.lastMonthStartDate = daysInMonth(this.props.year, this.props.month) - this.date.getDay() + 1;
		this.isThisMonthDate = false;
	}

	renderTBody(weekNumber) {
		let cells = [];
		for(let i = 0; i < 7; i++) {
			if(this.date.getDay() === i) {
				this.mappingOn = true;
				this.isThisMonthDate = true;
			}
			let cellValue = new Date(this.year, this.month, this.mappedDate).toLocaleDateString();
			if(!this.isThisMonthDate && !this.mappingOn) cellValue = "prevMonth";
			if(!this.isThisMonthDate && this.mappingOn) cellValue = "nextMonth"; 
			cells.push(<td key={"cell-"+weekNumber+i} 
					className={this.isThisMonthDate ? "active" : "inactive"}
					data-value={cellValue}
					onClick={this.props.onDateClicked} 
				>
					{this.mappingOn ? this.mappedDate : this.lastMonthStartDate}
				</td>
			);	
			this.mappingOn ? this.mappedDate++ : this.lastMonthStartDate++;
			if(this.mappedDate > this.daysInMonth) {
				this.mappedDate = 1;
				this.isThisMonthDate = false;
			}		
		}
		return (
			<tr key={"row-"+weekNumber}>
				{cells}
			</tr>
		)
	}

	createTable() {
		let rows = [];
		const weeks = Math.ceil((this.date.getDay() + this.daysInMonth)/ days.length);
		for(var i = 1; i <= weeks; i++) {
			rows.push(this.renderTBody(i))
		}
		this.mappingOn = false;

		return (
			<table>
				<thead>
					<tr>
						{ days.map((day, index) => {
							return (<th key={"day-"+index}>{day}</th>);
						}) }
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		)
	}

	render() {
		this.setMonthPageParams();		
		return (
			<div>
				{this.createTable()}
			</div>
		)
	}
}

MonthPage.propTypes = {
	year: PropTypes.number.isRequired,
	month: PropTypes.number.isRequired,
	onDateClicked: PropTypes.func.isRequired
}

export default MonthPage;