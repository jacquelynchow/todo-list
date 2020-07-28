import React, { useState, useEffect } from "react";

function TodosComponent() {
    /* declare new state variables by calling useState hook */
    /* [current state var, function that updates state var] */
    const [currentTodo, setCurrentTodo] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const todoList = localStorage.getItem('todoList');
        console.log(todoList); // currently todoList an object Object
        // parse string into JSON
        const todoData = JSON.parse(todoList);
        setTodos(todoData);
    // [] ensures that useEffect only runs once after reloading
    }, [] );
    /* function for creating a new todo and pushing it to the todo list */
    function createNewTodo(currentTodo) {
        console.log(todos);
        /* make a copy of the todos array using ellipses */
        if (todos != null) {
            let todosArray = [...todos];
            /* push a new object with the todo and boolean var isCompleted */
            todosArray.push({
                todo: currentTodo,
                isCompleted: false
            });
            const todosArrayData = JSON.stringify(todosArray);
            localStorage.setItem('todoList', todosArrayData);

            /* update todos array in state by using setTodos */
            setTodos(todosArray);
    // if list is empty add this thing, push directly to state
    } else {
            let firstTodo = [{
                todo: currentTodo,
                isCompleted: false
            }];
            setTodos(firstTodo);
            localStorage.setItem("todoList", JSON.stringify(firstTodo));
        }
    };
    function completeTodo(index) {
        /* make a copy of the todos array using ellipses */
        const todosArray = [...todos];
        /* set the isCompleted variable opposite to what it was before it was clicked
           allows us to mark and unmark the checkbox if needed
        */
        todosArray[index].isCompleted = !todosArray[index].isCompleted;
        /* update todos array in state by using setTodos */
        setTodos(todosArray);
    };
    function deleteTodo(index) {
        /* make a copy of the todos array using ellipses */
        let todosArray = [...todos];
        /* splice array to remove the todo at the index */
        todosArray.splice(index, 1);
        /* update todos array in state by using setTodos */
        setTodos(todosArray);
        /* re-update new todo list in local storage */
        const todosArrayData = JSON.stringify(todosArray);
        localStorage.setItem('todoList', todosArrayData);

    };
    return (
        <div>
            <h1><span role="img" aria-label="lightbulb-emoji">💡</span> To Do List <span role="img" aria-label="lightbulb-emoji">💡</span></h1>
            <p>
                {todos && todos.length > 0 && `${todos.length} items`}
            </p>
            <input 
                className = "todo-input"
                value = {currentTodo}
                /* when input box is changed, set current todo value to the value that was inputted */
                onChange = {event => {
                    setCurrentTodo(event.target.value);
                }}
                /* when Enter key is pressed, create a new todo and add it to the todo list, 
                then erase the contents for the next todo */
                onKeyPress = {event => {
                    if (event.key === "Enter") {
                        createNewTodo(currentTodo);
                        setCurrentTodo("");
                    }
                }}
                placeholder = "Add todos here..."
            />
            {
                /* print todos list 
                if todos is not undefined */
                todos !== undefined && todos.map((todo, index) => (
                    /* keys should be given to the elements inside the array to give the elements a stable identity */
                    <div key = {todo} className = "todo">
                        <div className = "checkbox" onClick = {() => completeTodo(index)}>
                            {/* conditionally render the checkmark if completed */}
                            {/* &#x2714; is the HTML unicode for a checkmark */}
                            {todo.isCompleted && <span><img alt="checkmark" src="https://img.icons8.com/cotton/30/000000/successfully-completed-task--v1.png"/></span>}
                        </div>
                        {/* display a strike through the text depending if todo.isCompleted evaluates to true */}
                        <div className = {todo.isCompleted ? "done" : ""}>
                            {todo.todo}
                        </div>
                        {/* display trashcan icon */}
                        <div className = "delete" onClick = {() => deleteTodo(index)}>
                            <div>&#128465;</div>
                        </div>
                    </div>
                ))
            }
        </div>       
    );
}

export default TodosComponent;