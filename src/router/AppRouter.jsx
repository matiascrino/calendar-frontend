import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage.jsx'
import { CalendarPage } from '../calendar/pages/CalendarPage.jsx'
import { useAuthStore } from '../hooks/useAuthStore.js'

export const AppRouter = () => {

    

    const {status, checkAuthToken} = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    },[])


    if(status === "checking") {
        return <h1>Checking...</h1>
    }



  return (
		<Routes>
			{
                (status === "not-authenticated")
                ? (
                    <>
                        <Route path="/auth/*" element={<LoginPage />} />
                        <Route path="/*" element={<Navigate to="/auth/login" />} />
                    </>
                )
                : (
                    <>
                        <Route path="/" element={<CalendarPage />} />
                        <Route path="/*" element={<Navigate to="/" />} />
                    </>
                )
            }

			<Route path="/*" element={<Navigate to="/auth/" />} />
		</Routes>
	);
}
