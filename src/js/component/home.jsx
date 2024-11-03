import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);


	function postTodo() {
		let newTask = {
			label: inputValue,
			is_done: false
		}

		fetch("https://playground.4geeks.com/todo/todos/MicaelaDeRosa23", {
			method: "POST",
			body: JSON.stringify(newTask),
			headers: {
				"Content-Type": "application/json"
			}
		})

			.then((response) => {
				return response.json()
			})
			.then((data) => {
				console.log(data);
			})


	}

	return (
		<div className="container mt-5">
			<h1>Todo List</h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setTodos(todos.concat([inputValue]));
								postTodo()
								setInputValue("");
							}
						}}
						placeholder="What do you need to do?"></input>
				</li>
				{todos.map((item, index) => (
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
				))}
			</ul>
			<div>{todos.length} tasks</div>
		</div>
	)
}

export default Home;