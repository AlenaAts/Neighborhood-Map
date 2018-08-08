import React, { Component } from 'react';

class List extends Component {

	render() {
		return(
			<div className="school-container">
			<ul className="school-list">
				{this.props.schools.map((school) => (
					<li key={school.id}>
					<button
					className="school-button"
					key={school.id}
					onClick={() => this.props.onSchoolClick(school)}
					>
						{school.name}
					</button>
				</li>
				))}
			</ul>
            </div>
		);
	}
}

export default List;