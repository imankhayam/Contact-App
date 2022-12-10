import React from "react";
import LoadingAnimation from "./components/LoadingAnimation";
import Contacts from "./pages/Contacts";
import NavBar from "./components/NavBar";
import AddContact from "./pages/AddContact";
import ContactDetails from "./pages/ContactDetails";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import { Routes, Route } from "react-router-dom";
import { useInitialState, useInitialStateActions } from "./provider/ContextProvider";
import "./sass/main.scss";

function App() {
    const state = useInitialState();
    const setState = useInitialStateActions();

    React.useEffect(() => {
        if (state.loadingPage === false) {
            setTimeout(() => {
                setState((prevState) => {
                    return { ...prevState, loadingPage: null };
                });
            }, 400);
        }
        const mySettings = JSON.parse(localStorage.getItem("mySettings"));
        if (mySettings) {
            setState((prevState) => {
                return { ...prevState, settings: mySettings };
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`App-${state.settings.darkMode ? "dark" : "light"}-${state.settings.theme}`}>
            <LoadingAnimation />
            <NavBar />
            <Routes>
                <Route path="/" element={<Contacts />} />
                <Route path="/addContact" element={<AddContact />} />
                <Route path="/contactDetails/:id" element={<ContactDetails />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </div>
    );
}

export default App;
