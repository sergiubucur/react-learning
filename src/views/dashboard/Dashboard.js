import React, { Component } from "react";

import Button from "../../common/button/Button";
import "./Dashboard.scss";

export default class Dashboard extends Component {
	state = {
		text: ""
	}

	handleTextChange = (e) => {
		this.setState({
			text: e.target.value
		});
	}

	handleClick = () => {
		alert(this.state.text);
	}

	render() {
		const { text } = this.state;

		return (
			<div className="dashboard">
				<h1>Test 2</h1>
				<input type="text" value={text} onChange={this.handleTextChange} />
				<Button onClick={this.handleClick} text={text} />
			</div>
		);
	}
}
