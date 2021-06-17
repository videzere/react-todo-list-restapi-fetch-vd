import React, { Console, stringify } from "react";
import { Container, Form, FormGroup, ListGroup } from "react-bootstrap";
import { useState } from "react";

export function Home() {
	const [tasks, setTasks] = useState([]);
	const [addtask, setAdd] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		let backup = tasks;
		setTasks([...backup, addtask]);
		setAdd("");
	};

	const deletetask = index => {
		setTasks(tasks.filter((task, i) => i !== index));
	};

	return (
		<Container className="container bg-light d-flex flex-column justify-content-center text-center pt-5">
			<h1>Todos</h1>
			<Form onSubmit={e => handleSubmit(e)}>
				<Form.Group controlId="formTodo">
					<Form.Control
						type="text"
						placeholder="What needs to be done?"
						value={addtask}
						onChange={e => setAdd(e.target.value)}
					/>
				</Form.Group>
			</Form>
			<ListGroup>
				{tasks.length === 0 ? (
					<ListGroup.Item className="d-flex justify-content-left text-secondary p-2">
						Empty
					</ListGroup.Item>
				) : (
					tasks.map((tasks, index) => {
						return (
							<ListGroup.Item
								key={index}
								className="d-flex justify-content-between text-secondary p-2 show">
								{tasks}
								{""}
								<span onClick={e => deletetask(index)}>✖</span>
							</ListGroup.Item>
						);
					})
				)}
			</ListGroup>
			<div className="d-flex justify-content-left text-secondary pt-4 pl-2 pb-4">
				{tasks.length === 1
					? `${tasks.length} item left`
					: tasks.length == 0
					? "0 items"
					: `${tasks.length} items left`}
			</div>
		</Container>
	);
}

// let baseUrl = "https://assets.breatheco.de/apis/fake/todos/user";
let data;

const updateTodolist = async newTodolist => {
	try {
		let resp = await fetch(
			`https://assets.breatheco.de/apis/fake/todos/user/videzere`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newTodolist)
			}
		);
		let data = await resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		if (resp.ok) {
			console.log(resp.ok); // will be true if the response is successfull
			// console.log(resp.status); // the status code = 200 or code = 400 etc.
			// console.log(resp.text()); // will try return the exact result as string			//here is were your code should start after the fetch finishes
			console.log(data); //this will print on the console the exact object received from the server
		} else {
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			console.log(data); //this will print on the console the exact object received from the server
		}
	} catch (error) {
		//error handling
		console.log(error);
	}
};
//updateTodolist(data);
// updateTodolist([
// 	{
// 		label: "other task",
// 		done: false
// 	},
// 	{
// 		label: "other task 2",
// 		done: false
// 	}
// ]);

const getTodolist = async () => {
	try {
		let resp = await fetch(
			`https://assets.breatheco.de/apis/fake/todos/user/videzere`
		);
		let data = await resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		if (resp.ok) {
			// console.log(resp.ok); // will be true if the response is successfull
			// console.log(resp.status); // the status code = 200 or code = 400 etc.
			// console.log(resp.text()); // will try return the exact result as string			//here is were your code should start after the fetch finishes
			console.log(data); //this will print on the console the exact object received from the server
			updateTodolist(data);
		} else {
			// console.log(resp.status); // the status code = 200 or code = 400 etc.
			// console.log(data); //this will print on the console the exact object received from the server
		}
	} catch (error) {
		//error handling
		console.log(error);
	}
};
//getTodolist();

const createTodolist = async () => {
	try {
		let resp = await fetch(
			`https://assets.breatheco.de/apis/fake/todos/user/videzere`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			}
		);
		let data = await resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		if (resp.ok) {
			getTodolist();
			// console.log(resp.ok); // will be true if the response is successfull
			// console.log(resp.status); // the status code = 200 or code = 400 etc.
			// console.log(resp.text()); // will try return the exact result as string			//here is were your code should start after the fetch finishes
			// console.log(data); //this will print on the console the exact object received from the server
		} else {
			// console.log(resp.status); // the status code = 200 or code = 400 etc.
			//console.log(data); //this will print on the console the exact object received from the server
		}
	} catch (error) {
		//error handling
		console.log(error);
	}
};
//createTodolist();

const verifyUser = async () => {
	try {
		let resp = await fetch(
			`https://assets.breatheco.de/apis/fake/todos/user/videzere`
		);
		let data = await resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		if (resp.status === 404) {
			// 	console.log(resp.ok); // will be true if the response is successfull
			// 	console.log(resp.status); // the status code = 200 or code = 400 etc.
			createTodolist();
		}
		if (resp.ok) {
			// console.log(resp.ok); // will be true if the response is successfull
			// console.log(resp.status); // the status code = 200 or code = 400 etc.
			// console.log(resp.text()); // will try return the exact result as string			//here is were your code should start after the fetch finishes
			// console.log(data); //this will print on the console the exact object received from the server
			getTodolist();
		} else {
			console.log(resp.status); // the status code = 200 or code = 400 etc.
		}
	} catch (error) {
		//error handling
		console.log(error);
	}
};
verifyUser();
