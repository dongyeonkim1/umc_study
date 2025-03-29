import { useState, FormEvent } from "react";


const TodoForm = () => {
    const [input, setInput] = useState<string>('');
    const { addTodo } = useTodo();

 const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
            e.preventDefault();
            const text = input.trim();
    
            if(text) {
                //addTodo
                addTodo(text);
                setInput('');
            }
        };

    return (
        <form onSubmit={handleSubmit} className="tood-container__form">
            <input 
                value={input}
                onChange={(e): void => setInput(e.target.value)}
                type="text"
                className="tood-container__input"
                placeholder="할 일 입력"
                required
            />
            <button type="submit" className="todo-container__button">
                할 일 추가
            </button>
        </form>
    );
};

export default TodoForm;