import React, {useEffect, useState} from 'react'
import moment from 'moment'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import {useDispatch, useSelector} from 'react-redux';
import {uiCloseModal} from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpadate } from '../../actions/events';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

if ( process.env.NODE_ENV !== 'test' ){
    Modal.setAppElement('#root');
}


const now = moment().minutes(0).seconds(0).add(1,'hours')
const finish = now.clone().add(1,'hours')

const initEvent = {
    title:'',
    notes:'',
    start: now.toDate(),
    end: finish.toDate()
}

const CalendarModal = () => {

    const dispatch = useDispatch()

    const { modalOpen } = useSelector(state => state.ui)
    const { activeEvent } = useSelector(state => state.calendar)

    const [ formValues, setFormValues ] = useState(initEvent)

    const { title,notes,start, end } = formValues

    useEffect( () => {
        if( activeEvent ){
            setFormValues(activeEvent)
        }else{
            setFormValues( initEvent )
        }
    },[activeEvent,setFormValues])

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const [ dateStart, setDateStart ] = useState(now.toDate())
    const [ dateFinish, setFinish ] = useState(finish.toDate())
    const [ titleValid, setTitleValid ] = useState(true)

    const closeModal = () => {
        dispatch( uiCloseModal() )
        dispatch( eventClearActiveEvent() )
        setFormValues( initEvent )
    }

    const handleStartDateChange = (e) => {
        setDateStart(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleFinishDateChange = (e) => {
        setFinish(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const momentStart = moment(start)
        const momentEnd = moment(end)

        if( momentStart.isSameOrAfter( momentEnd ) ){
            return Swal.fire('Error','Fecha fin  debe ser mayor a la Fecha inicio','error')
        }

        if(title.trim().length < 2){
            return setTitleValid(false)
        }

        //aqui actialzar o grabar una event, todo depende de la event activa
        //si esta null significa que estamos creando un event, si no lo es estoy editando

        if( activeEvent ){
            dispatch( eventStartUpadate( formValues ) )
        }else{
            dispatch(eventStartAddNew(formValues))
        }



        setTitleValid(true)
        closeModal()

    }

    return (
     <Modal
        isOpen={ modalOpen }
        onRequestClose={closeModal} 
        style={customStyles}
        closeTimeoutMS={ 200 }
        className='modal'
        overlayClassName='modal-fondo'
        ariaHideApp={ !process.env.NODE_ENV === 'test' }

            
    >
         <h1>{ (activeEvent)? 'Editando Evento':'Nuevo Evento' }</h1>
        <hr />
        <form 
            className="container"
            //obtener toda la informacion a la mano
            onSubmit= { handleSubmitForm }
        >

            <div className="form-group">
                <label>Fecha y hora inicio</label>
                <DateTimePicker 
                    onChange={ handleStartDateChange } 
                    value={ dateStart  }
                    className='form-control'
                />
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker 
                    onChange={ handleFinishDateChange } 
                    value={ dateFinish  }
                    //para espicificar una fecha minima
                    minDate={ dateStart }
                    className='form-control'
                />
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={ `form-control ${titleValid || 'is-invalid'}`  }
                    placeholder="T??tulo del evento"
                    name="title"
                    autoComplete="off"
                    value={ title }
                    onChange= { handleInputChange }
                />
                <small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ notes }
                    onChange= { handleInputChange }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
    )
}

export default CalendarModal
