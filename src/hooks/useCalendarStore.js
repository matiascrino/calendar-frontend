import {useSelector, useDispatch} from "react-redux";
import {onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents} from "../store";
import {calendarApi} from "../api";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar)
    const {user} = useSelector(state => state.auth)
    

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {

        try{
            if(calendarEvent.id){
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({...calendarEvent, user}));
                return;
            }
            const {data} = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}));
        }catch(error){
            Swal.fire('Error', error.response.data.msg, 'error')
        }
    }

    const startDeletingEvent = async () => {
        //TODO, enviar al backend.
        try{
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        }catch(error){
            Swal.fire('Error', error.response.data.msg, 'error')
        }
    }

    const startLoadingEvents = async() => {
        try{
            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));

        }catch(error){
            Swal.fire('Error', error.response.data.msg, 'error')
        }
    }
  
    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    };
}
