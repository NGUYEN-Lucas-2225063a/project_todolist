import PropTypes from 'prop-types';
import Button from './Button';
import {FaPlus} from "react-icons/fa6";


const Form = ({addTodo}) => {
    const onSubmit = (event) => {
        event.preventDefault();
        const todoText = event.target.elements.todo.value.trim();
        if (todoText !== '') {
            addTodo(todoText);
            event.target.reset();
        }
    };

    return (
        <form className="form-wrapper" onSubmit={onSubmit}>
            <input id="todo" type="text" placeholder="Entrer une tâche"></input>
            <Button type="submit" className="button_add">
                <FaPlus className="faplus"/>
            </Button>
        </form>
    );
};

Form.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default Form;
