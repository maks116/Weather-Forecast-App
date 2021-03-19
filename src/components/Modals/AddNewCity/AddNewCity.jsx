import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';

import './AddNewCity.css'

const AddNewCity = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [newCity, setNewCity] = useState("Moscow");
    const [title, setTitle] = useState("Подождите...");

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
        setTitle("Подождите...");
    };

    const modalLoaded = () => {
        setTitle("Введите название города");
    };

    const onNewCityChange = (e) => {
        setNewCity(e.target.value)
    }

    const onSaveNewCity = () => {
        props.addCityByName({name:newCity, id:props.citys.length},false, props.citys.length)
        hideModal()
    }

    return (
        <div className="add-new-city">
            <button 
                className="add"
                onClick={showModal}>
                Добавить город!
            </button>
            
            <Modal show={isOpen} onHide={hideModal} onEntered={modalLoaded}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input    
                        type="text"      
                        className="input-city"
                        placeholder={newCity}
                        onChange={onNewCityChange}                    
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={hideModal}>Отменить</button>
                    <button onClick={onSaveNewCity}>Добавить</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddNewCity