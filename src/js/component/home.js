import React from "react";
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
