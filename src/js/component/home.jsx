import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);


	function postTodos() {
		let newTask = {
			label: "Study",
		}
		fetch("https://playground.4geeks.com/todo/todos/MicaelaDeRosa23", {
			method: "POST",
			body: JSON.stringify({label : newTask}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => { response.json })
			.then((data) => {
				console.log(data);
			})
			.catch((error) => { return error })
	}


	fetch("https://playground.4geeks.com/todo/users/MicaelaDeRosa23")
		.then((resp) => {
			console.log(resp.status)
			return resp.json()
		})
		.then((data) => {
			console.log(data)
			//setTodos(data.todos)
		})
		.catch((error) => { return error })

		function deleteTodos() {
			let deleteTasks = {
				label: "Study",
			}
			fetch("https://playground.4geeks.com/todo/users/MicaelaDeRosa23", {
				method: "DELETE",
				body: JSON.stringify(deleteTasks),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {if(response.ok){console.log("Delete Tasks");
				}
				 })
				.then((data) => {
					console.log(data);
				})
				.catch((error) => {console.error("Error delete tasks",error );})
		};


	return (
		<div className="container mt-5">
			<h1>Todo List</h1>
			{todos.length == 0 ? <h1>Wait</h1> : todos.map((todo, index, array) => {
				console.log(todo);
				return <h1>(new  Task)</h1>
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
								deleteTodos();
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
	);
}


export default Home;
