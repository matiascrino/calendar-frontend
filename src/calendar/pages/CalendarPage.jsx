import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import localizer from "../../helpers/calendarLocalizer";
import getMessagesES from "../../helpers/getMessages";
import { CalendarEventBox } from "../components/CalendarEventBox";
import { CalendarModal } from "../components/CalendarModal";
import { useUiStore, useCalendarStore } from "../../hooks";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";
import { useAuthStore } from "../../hooks/useAuthStore";




export const CalendarPage = () => {


	const {user} = useAuthStore();

	const [lastView, setLastView] = useState(
		localStorage.getItem("lastView") || "week"
	);

    const { openDateModal } = useUiStore();
    const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();

	const eventStyleGetter = (event, start, end, isSelected) => {
		
		const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)


		const style = {
			backgroundColor: isMyEvent ? "#367CF7" : "#465660",
			borderRadius: "0px",
			opacity: 0.8,
			display: "block",
			color: "white",
		};

		return {
			style,
		};
	};

	const onDoubleClick = (event) => {
		openDateModal();
	};

	const onSelect = (event) => {
		setActiveEvent(event);
	};

	const onViewChange = (event) => {
		localStorage.setItem("lastView", event);
	};

	useEffect(() => {
		startLoadingEvents();
	}, []);

	return (
		<>
			<NavBar />
			<Calendar
				culture="es"
				localizer={localizer}
				events={events}
				defaultView={lastView}
				startAccessor="start"
				endAccessor="end"
				style={{ height: "calc(100vh - 80px)" }}
				messages={getMessagesES()}
				eventPropGetter={eventStyleGetter}
				components={{
					event: CalendarEventBox,
				}}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelect}
				onView={onViewChange}
			/>

			<CalendarModal />
            <FabAddNew/>
            <FabDelete/>
		</>
	);
};
