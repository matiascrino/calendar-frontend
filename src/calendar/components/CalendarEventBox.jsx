import React from 'react'

export const CalendarEventBox = ({event}) => {
  
  const {title, user} = event;
  
    return (
        <div>
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </div>
  )
}
