import React from "react";
import TodoList from "./components/TodoList";

const App = () => {

  return (
    <div>
        <h1 className="text-center text-3xl font-bold underline">Basic Todo List</h1>
        <TodoList />
    </div>
  );
};

export default App;

