import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);


	useEffect(() => {
		getTodos();
	}, []);

	function postTodos() {
		let newTask = {
			label: inputValue,
			is_done: false,
		}
		fetch("https://playground.4geeks.com/todo/todos/MicaelaDeRosa23", {
			method: "POST",
			body: JSON.stringify(newTask),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setTodos([...todos, data]);
			})
			.catch((error) => {
				console.log(error);
			})
	}

	function getTodos() {
		fetch("https://playground.4geeks.com/todo/users/MicaelaDeRosa23")
			.then((resp) => {
				console.log(resp.status)
				return resp.json()
			})
			.then((data) => {
				console.log(data)
				setTodos(data.todos)
			})
			.catch((error) => {
				console.log(error);
			})
	}

	function deleteTodo(todoId) {
		const deleteTasks = todos.filter((todo) => todo.id !== todoId)
		fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
			method: "DELETE",
			body: JSON.stringify(deleteTasks),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				if (response.ok) {
					console.log("Delete Tasks");
					getTodos();
				}

			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => { console.error("Error delete tasks", error); })
	}

	return (
		<div className="container mt-5">
			<h1>Todo List</h1>
			{todos.length == 0 ? <h1>Wait</h1> : todos.map((todo) => {
				console.log(todo);
				return <div className="d-flex">

					<h1 key={todo.id}>{todo.label}</h1>
					<div onClick={() => { deleteTodo(todo.id) }} >
						<i
							class=" fas fa-trash-alt"
						></i>


					</div>
				</div>

			})}
			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setTodos(todos.concat([inputValue]));
								setInputValue("");
								postTodos();

							}
						}}
						placeholder="What do you need to do?"></input>
				</li>
				{/* {todos.map((item, index) => (
					<li>
						{item}{""}
						<i
							class=" fas fa-trash-alt"
							onClick={() =>
								setTodos(
									todos.filter(
										(t, currentIndex) =>
											index !== currentIndex
									)
								)
							}></i>
					</li>
				))} */}
			</ul>
			<div>{todos.length} tasks</div>
		</div>
	);
};


export default Home;
