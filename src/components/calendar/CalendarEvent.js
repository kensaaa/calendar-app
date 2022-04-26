import React from 'react'

//recibe todo el evento
const CalendarEvent = ({event}) => {

    //extremos la informacion del evento
    const { title, user } = event

    return (
        <div>
            <strong> { title } </strong>
            <span> { user.name } </span>
        </div>
    )
}

export default CalendarEvent
