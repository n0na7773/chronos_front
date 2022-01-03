import React, { useContext, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import AuthContext from "./Storage/auth-context";
import Loader from "react-loader-spinner";
import "antd/dist/antd.css";
import SingleCalendarPage from "./Components/Pages/SingleCalendarPage";

const SignInPage = React.lazy(() => import("./Components/Pages/SignInPage"));
const SignUpPage = React.lazy(() => import("./Components/Pages/SignUpPage"));
const ProfilePage = React.lazy(() => import("./Components/Pages/ProfilePage"));
const CalendarsPage = React.lazy(() => import("./Components/Pages/CalendarsPage"));
const EventsPage = React.lazy(() => import("./Components/Pages/EventsPage"));

function App() {
  const ctxAuth = useContext(AuthContext);

  return (
    <Layout>
      <Suspense
        fallback={
          <Loader
            type="TailSpin"
            color="#D2E1FF"
            height={100}
            width={100}
            timeout={5000}
          />
        }
      >
        <Routes>
          <Route path="/signIn" exact element={<SignInPage />} />
          <Route path="/signUp" exact element={<SignUpPage />} />
          {ctxAuth.isLoggedIn && (
            <Route path="/profile" exact element={<ProfilePage />} />
          )}
          {ctxAuth.isLoggedIn && (
            <Route path="/calendars" exact element={<CalendarsPage />} />
          )}
          {ctxAuth.isLoggedIn && (
            <Route path="/events" exact element={<EventsPage />} />
          )}
          {ctxAuth.isLoggedIn && (
            <Route path="/calendars/:calendar_id" exact element={<SingleCalendarPage />} />
          )}
          {!ctxAuth.isLoggedIn && (
            <Route path="*" element={<Navigate to="/signIn" />} />
          )}
          {ctxAuth.isLoggedIn && (
            <Route path="*" element={<Navigate to="/profile" />} />
          )}

        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
