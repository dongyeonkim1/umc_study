
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import {useTodo} from '../context/TodoContext';


const Todo = () => {
        const [input, setInput] = useState<string>('');
        const {todos, completeTodo, addTodo, deleteTodo, doneTodos} = useTodo();
    
    };
    
    return (
    <div className="todo-container">
        <h1 className="todo-container__header">YONG TODO</h1>
        <TodoForm/>
        <div className="render-container">
            <TodoList 
            title='할 일' 
            todos={todos} 
            buttonLabel='완료'
            buttonColor='#a28745' 
            onClick={completeTodo}
            />
        <TodoList 
            title='완료' 
            todos={doneTodos}
            buttonLabel='삭제' 
            buttonColor='#a28745' 
            onClick={deleteTodo}
             />
        </div>
    </div>

    );
};

export default Todo;