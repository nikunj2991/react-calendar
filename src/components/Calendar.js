import React from 'react';
import MonthPage from './MonthPage';

const locale = "en-us"; 
const TOTAL_MONTHS = 12;

class Calendar extends React.Component {
	constructor() {
		super();
		this.nextMonth = this.nextMonth.bind(this);
		this.prevMonth = this.prevMonth.bind(this);
		this.onDateClicked = this.onDateClicked.bind(this);
		this.currentDate = new Date();
		this.state = {
			year: this.currentDate.getFullYear(),
			month: this.currentDate.getMonth(),
			date: this.currentDate.toDateString()
		};
	}

	onDateClicked(event, element) {
		const targetValue = event.target.getAttribute('data-value');
		if(targetValue === "prevMonth") {
			this.prevMonth();
		} else if(targetValue === "nextMonth") {
			this.nextMonth();
		} else {
			const date = new Date(targetValue).toDateString();
			this.setState(...this.state, {date})
		}
	}

	nextMonth() {
		const nextMonth = (this.state.month + 1) % TOTAL_MONTHS;
		const year = nextMonth === 0 ? this.state.year + 1 : this.state.year;
		this.setState({month: nextMonth, year });
	}

	prevMonth() {
		const prevMonth = (this.state.month + TOTAL_MONTHS - 1) % TOTAL_MONTHS;
		const year = prevMonth === 11 ? this.state.year - 1 : this.state.year;
		this.setState({month: prevMonth, year });
	}

	render() {
		const monthName = new Date(this.state.year, this.state.month, 1).toLocaleString(locale, {month: "long"});
		return(
			<div>
				<div>
					<h1>{ monthName + " " + this.state.year}</h1>
					<button onClick={this.prevMonth}>{'<<'}</button>
					<button onClick={this.nextMonth}>{'>>'}</button>
				</div>
				<MonthPage year={this.state.year} month={this.state.month} onDateClicked={this.onDateClicked} />
				<br />
				<div>
					Date: {this.state.date}
				</div>
			</div>
		);
	}
}

export default Calendar;