import React, {useState} from 'react'
import { Calendar,momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import NavBar from '../ui/NavBar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {messages} from '../../helpers/calendar-messages-spanish'
import CalendarEvent from './CalendarEvent'
import CalendarModal from './CalendarModal'
import {useDispatch, useSelector} from 'react-redux'
import { uiOpenModal} from '../../actions/ui'
import {eventClearActiveEvent, eventSetActive} from '../../actions/events'
import AddNewFab from '../ui/AddNewFab'
import DeleteEventFab from '../ui/DeleteEventFab'

const localizer = momentLocalizer(moment)

moment.locale('es')


const CalendarScreen = () => {

    const dispatch = useDispatch()
    const { events,activeEvent } = useSelector(state => state.calendar)
    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'month')


    const onDoubleClick = (e) => {
        dispatch( uiOpenModal() )
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) )
    }

    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView',e)
    }

    const onSelectSlot = (e) => {
        //esto me entrega donde seleccione en el calendario
        dispatch( eventClearActiveEvent() )
    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor:'#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display:'block',
            color:'white'
        }

        return {
            style
        }
        

    }

    return (
        <div className='calendar-screen'>
            <NavBar />

            <Calendar 
                localizer= {localizer}
                events={ events }
                startAccessor='start'
                endAccessor='end'
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent = { onDoubleClick }
                onSelectEvent= { onSelectEvent }
                onView={ onViewChange }
                //necesito esto
                onSelectSlot={ onSelectSlot }
                selectable={true}
                // hasta aqui
                view={ lastView }
                components= {{
                    event: CalendarEvent
                }}
            />
            <AddNewFab /> 
            {
                activeEvent &&

                    (
                        <DeleteEventFab />
                    )
            }

            <CalendarModal />
        </div>
    )
}

export default CalendarScreen
