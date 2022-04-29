import React, {useEffect, useState} from 'react'
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
import {eventClearActiveEvent, eventSetActive, eventStartLoading} from '../../actions/events'
import AddNewFab from '../ui/AddNewFab'
import DeleteEventFab from '../ui/DeleteEventFab'

const localizer = momentLocalizer(moment)

moment.locale('es')


const CalendarScreen = () => {

    const dispatch = useDispatch()
    const { uid } = useSelector(state => state.auth)
    const { events,activeEvent } = useSelector(state => state.calendar)
    const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'month')

    useEffect( () => {
        dispatch( eventStartLoading() )
    },[ dispatch ])

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
            //pregunta si usuario es igual al usuario que creo el evento son iguales, si lo son cambia color a celeste
            backgroundColor: (uid === event.user._id)? '#367CF7':'#465660',
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
