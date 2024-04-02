import { useState, useEffect } from "react";
import Button from "./Button.jsx";
import PropTypes from "prop-types";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Popup from "reactjs-popup";

const Todo = ({
                  todo,
                  onDelete,
                  onEdit,
                  isEditing,
                  onEditSave,
              }) => {
    const [editedText, setEditedText] = useState(todo);
    const [setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(() => {
        const savedDate = localStorage.getItem("selectedDate");
        return savedDate ? new Date(savedDate) : new Date();
    });
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        localStorage.setItem("selectedDate", selectedDate);
    }, [selectedDate]);

    const setCalendar = () => {
        setShowCalendar((prevShowCalendar) => !prevShowCalendar);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        localStorage.setItem("selectedDate", date); // Sauvegarde de la nouvelle date dans le localStorage
        setShowCalendar(false);
    };

    const handleEditChange = (event) => {
        setEditedText(event.target.value);
    };

    const handleSaveClick = () => {
        onEditSave(editedText);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="todo-wrapper">
            {isEditing ? (
                <>
                    <input
                        id="editInput"
                        type="text"
                        value={editedText}
                        className="save-input"
                        placeholder={"Modifier la tâche"}
                        onChange={handleEditChange}
                    />
                    <Button onClick={handleSaveClick}>
                        <IoIosSave />
                    </Button>
                </>
            ) : (
                <>
                    <div className="todo-checkbox">
                        <input
                            className="checkbox-todo"
                            type="checkbox"
                            onClick={handleCheckboxChange}
                        />
                    </div>

                    <span className={`todo-text ${isChecked ? "checked" : ""}`}>
            {todo}
          </span>
                    <div className="todo-button">
                        <Button onClick={onEdit}>
                            <FaRegEdit />
                        </Button>
                        <Button onClick={onDelete}>
                            <FaTrashAlt />
                        </Button>

                        <Popup trigger={<Button onClick={setCalendar}><FaCalendarAlt /></Button>} modal nested>
                            {(close) => (
                                <div className="modal">
                                    <button className="close" onClick={close}>&times;</button>
                                    <div className="header"> Calendrier</div>
                                    <div className="content">
                                        <Calendar onChange={handleDateChange} value={selectedDate} />
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </div>
                    <div className="todo-date">
                        <MdDateRange />
                        <p className="date-list">{selectedDate.toLocaleDateString()}</p>
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
};

export default Todo;
