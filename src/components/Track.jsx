import React, {  useState } from "react";

const Track = () => {

    // Load from localStorage on start
    const [Todo, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [todoQuery, setTodoQuery] = useState("");

    function handleDelete(indexToDelete) {
        const updatedTodos = Todo.filter((_, index) => index !== indexToDelete);
        setTodos(updatedTodos);

        // ❌ DO NOT save to localStorage here
    }

    const handleAddTodo = () => {
        if (todoQuery.trim() !== "") {
            const updatedTodos = [...Todo,  todoQuery];

            setTodos(updatedTodos);

            // ✅ ONLY save when adding
            localStorage.setItem("todos", JSON.stringify(updatedTodos));

            setTodoQuery("");
        } else {
            alert("please input something");
        }
    };

    return (
        <div className="h-screen w-screen bg-red-400 flex flex-col gap-6 items-center justify-center">

            <div className="flex gap-2">
                <input
                    type="text"
                    className="border-2 border-white indent-2 h-12 rounded-md text-white"
                    placeholder="enter todo"
                    value={todoQuery}
                    onChange={(e) => setTodoQuery(e.target.value)}
                />

                <button
                    className="bg-white rounded-md px-4 h-12"
                    onClick={handleAddTodo}
                >
                    add
                </button>
            </div>

            <div className="grid gap-2 w-1/2">
                {Todo.map((todo, index) => (
                    <div key={index} className="flex justify-between bg-white p-4 rounded-md">
                        {todo}
                        <button
                            onClick={() => handleDelete(index)}
                            className="bg-green-500 text-white px-2"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Track;