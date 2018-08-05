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