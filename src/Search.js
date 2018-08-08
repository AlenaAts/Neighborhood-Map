import React, { Component } from 'react';

class Search extends Component {
	render() {
		return(
			<div className="search-wrapper">
                <input
                type="text"
                className="school-search"
                placeholder="Search"
                value={this.props.query}
                onChange={(event) => this.props.onChange(event.target.value)}
                aria-label="School search form">
                </input>
            </div>
		);
	}
}

export default Search;