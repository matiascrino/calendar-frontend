import React from 'react'
import { useUiStore, useCalendarStore } from '../../hooks';
import { addHours } from 'date-fns';



export const FabAddNew = () => {

  const {openDateModal} = useUiStore();  
  const {setActiveEvent} = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
		title: "",
		notes: "",
		start: new Date(),
		end: addHours(new Date(), 2),
		bgcolor: "#fafafa",
		user: {
			_id: "123",
			name: "Matias",
		},
    })

    openDateModal();
  }




  return (
    <button className='btn btn-primary fab' onClick={handleClickNew} >
        <i className="fas fa-plus"></i>
    </button>
  )
}
