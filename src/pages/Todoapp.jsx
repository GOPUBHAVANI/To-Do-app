import { useState } from 'react';

const Todoapp = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    // function to create Todo
    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, { id: Date.now(), text: input, done: false }]);
            setInput("");
        }
    };

    // function to Remove Todo
    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    // function to Toggle Todo
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
    };

    // function to Edit Todo
    const StartEdit = (id, text) => {
        setEditId(id);
        setEditText(text);
    };

    // function to save-Edit Todo
    const SaveEdit = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editText } : todo));
        setEditId(null);
        setEditText("");
    };

    return (
        <div className="container border border-success bg-white rounded-3" style={{ width: "100%", maxWidth: "800px" }}>
            {/* input start */}
            <h2 className='text-center p-4 text-secondary'>TO-DO-APP📃</h2>
            <div className="d-flex flex-column flex-md-row p-4 align-items-center">
                <input
                    className='form-control border border-success mb-2 mb-md-0'
                    type='text'
                    value={input}
                    placeholder='Enter Your To-do-list.....'
                    onChange={(e) => setInput(e.target.value)}
                />
                {/* Add btn start */}
                <button className='btn btn-success mx-md-2 mt-2 mt-md-0' onClick={() => addTodo()}>Add</button>
                {/* Add btn end */}
            </div>
            {/* input end */}

            {/* todolist items start */}
            <div className="">
                {todos.map(todo => (
                    <li key={todo.id} className='list-group-item d-flex justify-content-center align-items-center p-4' style={{ width: "100%", maxWidth: "600px" }}>
                        {/* editing the text */}
                        <div className='flex-grow-1 text-center'>
                            {
                                editId === todo.id ? (
                                    <input
                                        className='form-control border border-success fs-5'
                                        type='text'
                                        value={editText}
                                        placeholder='Enter todo.....'
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                ) : (
                                    <span className={todo.done ? "text-decoration-line-through text-secondary fs-5" : "text-dark fs-5"}>{todo.text}</span>
                                )
                            }
                        </div>
                        {/* editing the buttons */}
                        <div className='d-flex gap-1'>
                            {
                                editId === todo.id ? (
                                    <button className='btn btn-success mx-1' onClick={() => SaveEdit(todo.id)}>save</button>
                                ) : (
                                    <>
                                        <button className='btn btn-warning mx-1' onClick={() => StartEdit(todo.id, todo.text)}>edit</button>
                                        <button className='btn btn-info mx-1' onClick={() => toggleTodo(todo.id)}>{todo.done ? "done" : "undo"}</button>
                                    </>
                                )
                            }
                            <button className='btn btn-danger mx-1' onClick={() => removeTodo(todo.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </div>
            {/* todolist items end */}
        </div>
    );
};

export default Todoapp;
