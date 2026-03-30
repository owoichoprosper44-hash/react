import React, { useState } from "react";

function TodoApp() {
  const [input, setInput] = useState("prosper");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (input.trim() === "") return; // Ignore empty input
    setTasks([...tasks, { text: input, status: "Pending" }]);
     setInput("");
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Todo List</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your task"
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <button onClick={handleAddTask}>Add</button>

      <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <span
              style={{
                textDecoration: task.status === "Completed" ? "line-through" : "none",
                marginRight: "10px",
              }}
            >
              {task.text}

            </span>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(index, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
