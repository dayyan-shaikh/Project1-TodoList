import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [Todolist, setTodolist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errmsg, setErrmsg] = useState(null);

  const apifetch = async () => {
    try {
      setLoading(true);
      const apires = await fetch("https://dummyjson.com/todos");
      const res = await apires.json();
      console.log(res);

      if (res?.todos) {
        setTodolist(res.todos);
        setLoading(false);
        setErrmsg("");
      } else {
        setTodolist([]);
        setLoading(true);
        setErrmsg("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    apifetch();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Todo List</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : errmsg ? (
        <p className="text-center text-red-500">{errmsg}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 cursor-p">
          {Todolist.map((todo) => (
            <div
              key={todo.id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-2">Todo #{todo.id}</h2>
              <p className="text-gray-700">{todo.todo}</p>
              <button className="bg-gray-600 text-white rounded-lg w-20 mt-5 px-4 py-2 hover:bg-gray-700 cursor-pointer">Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
