import {useState} from "react";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import PropTypes from "prop-types";
import {FaRegEdit} from "react-icons/fa";
import {FaTrashAlt} from "react-icons/fa";
import {IoIosSave} from "react-icons/io";
import {FaCalendarAlt} from "react-icons/fa";
import {MdDateRange} from "react-icons/md";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const Todo = ({todo, onDelete, onEdit, isEditing, onEditSave}) => {
    const [editedText, setEditedText] = useState(todo);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Nouvel état pour stocker la date sélectionnée

    const setCalendar = () => {
        setShowCalendar(prevShowCalendar => !prevShowCalendar);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date); // Met à jour la date sélectionnée
        setShowCalendar(false); // Cache le calendrier après la sélection de la date
    }
    const handleEditChange = (event) => {
        setEditedText(event.target.value); // Met à jour le texte modifié
    };

    const handleSaveClick = () => {
        onEditSave(editedText);
    };

    return (
        <div className="todo-wrapper">
            {isEditing ? (
                <>
                    <Input type="Modifier" value={editedText} className="save-input" onChange={handleEditChange}/>
                    <Button onClick={handleSaveClick}>
                        <IoIosSave/>
                    </Button>
                </>
            ) : (
                <>
                    <span className="todo-text">{todo}</span>
                    <div className="todo-button">
                        <Button onClick={onEdit}>
                            <FaRegEdit/>
                        </Button>
                        <Button onClick={onDelete}>
                            <FaTrashAlt/>
                        </Button>
                        <Popup trigger={<Button onClick={setCalendar}>
                            <FaCalendarAlt/>
                        </Button>} position="center">
                            {showCalendar && <Calendar onChange={handleDateChange}
                                                       value={selectedDate}/>}
                        </Popup>


                    </div>
                    <div className="todo-date">
                        <MdDateRange/>
                        <p className="date-list">
                            {selectedDate.toLocaleDateString()}</p>
                    </div>


                </>
            )}
        </div>
    );
};

Todo.propTypes = {
    todo: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    onEditSave: PropTypes.func.isRequired,
    onCalendar: PropTypes.func.isRequired,
};

export default Todo;