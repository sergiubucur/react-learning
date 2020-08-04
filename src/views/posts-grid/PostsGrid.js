import React, { Component } from "react";
import axios from "axios";

import "./PostsGrid.scss";

export default class PostsGrid extends Component {
	state = {
		data: null,
		backendRequestPending: true
	};

	componentDidMount() {
		this.getData();
	}

	getData() {
		this.setState({
			backendRequestPending: true
		}, () => {
			axios.get("http://localhost:3005/posts").then(({ data }) => {
				this.setState({
					backendRequestPending: false,
					data
				});
			});
		});
	}

	handleRefreshClick = () => {
		this.getData();
	}

	handleAddClick = () => {
		this.setState({
			backendRequestPending: true
		}, () => {
			const newPost = this.getNewPost();

			axios.post("http://localhost:3005/posts", newPost).then(() => {
				this.getData();
			});
		});
	}

	handleDeleteClick = (id) => {
		this.setState({
			backendRequestPending: true
		}, () => {
			axios.delete(`http://localhost:3005/posts/${id}`).then(() => {
				this.getData();
			});
		});
	}

	getNewPost() {
		const id = Math.floor(Math.random() * 100 + 100);

		return {
			id,
			title: `new post ${id}`,
			author: "typicode C"
		}
	}

	renderList() {
		return (
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Title</th>
						<th>Author</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{this.state.data.map(x => {
						return (
							<tr key={x.id}>
								<td>{x.id}</td>
								<td>{x.title}</td>
								<td>{x.author}</td>
								<td>
									<button type="button" onClick={() => this.handleDeleteClick(x.id)}>Delete</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}

	render() {
		return (
			<div className="posts-grid">
				<button type="button" onClick={this.handleRefreshClick} disabled={this.state.backendRequestPending}>Refresh</button>
				<button type="button" onClick={this.handleAddClick} disabled={this.state.backendRequestPending}>Add</button>

				{this.state.backendRequestPending
					? <div>Loading...</div>
					: this.renderList()}
			</div>
		);
	}
}
