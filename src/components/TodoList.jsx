import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [openTodoId, setOpenTodoId] = useState(null); // State to track open todo ID

  const apiFetch = async () => {
    try {
      setLoading(true);
      const apiRes = await fetch("https://dummyjson.com/todos");
      const res = await apiRes.json();
      console.log(res);
      
      if (res?.todos) {
        setTodoList(res.todos);
        setLoading(false);
        setErrMsg("");
      } else {
        setTodoList([]);
        setLoading(false);
        setErrMsg("No todos found.");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErrMsg("An error occurred while fetching todos.");
    }
  };

  useEffect(() => {
    apiFetch();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Todo List</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : errMsg ? (
        <p className="text-center text-red-500">{errMsg}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {todoList.map((todo) => (
            <div
              key={todo.id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-2">Todo #{todo.id}</h2>
              <p className="text-gray-700">{todo.todo}</p>
              <button
                className="bg-gray-600 text-white rounded-lg w-20 mt-5 px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => setOpenTodoId(todo.id)}
              >
                Details
              </button>

              {openTodoId === todo.id && (
                <div className="mt-4 p-4 border-t">
                  <h3 className="text-md font-bold">Details for Todo #{todo.id}</h3>
                  <p>Status: {todo.completed ? "Completed" : "Not Completed"}</p>
                  <button
                    className="bg-red-500 text-white rounded-lg w-20 mt-3 px-4 py-2 hover:bg-red-600 cursor-pointer"
                    onClick={() => setOpenTodoId(null)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
