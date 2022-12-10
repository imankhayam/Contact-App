import React from "react";
import "../sass/navbar.scss";
import { IoMdContact } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { RiSettings3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useInitialState, useInitialStateActions } from "../provider/ContextProvider";

function NavBar() {
    const navigate = useNavigate();

    const state = useInitialState();
    const setState = useInitialStateActions();

    const HomeLoadingHandler = () => {
        if (!state.activeLinks.home) {
            setState((prevState) => {
                return { ...prevState, loadingPage: true };
            });
            setTimeout(() => {
                navigate("/");
            }, 400);
        }
    };

    const settingsLoadingHandler = () => {
        if (!state.activeLinks.settings) {
            setState((prevState) => {
                return { ...prevState, loadingPage: true };
            });
            setTimeout(() => {
                navigate("/settings");
            }, 400);
        }
    };

    const SearchLoadingHandler = () => {
        if (!state.activeLinks.search) {
            setState((prevState) => {
                return { ...prevState, loadingPage: true };
            });
            setTimeout(() => {
                navigate("/search");
            }, 400);
        }
    };

    return (
        <div className={`navbar-${state.settings.darkMode ? "dark" : "light"}-${state.settings.theme}`}>
            <div onClick={HomeLoadingHandler}>
                <IoMdContact className={`contact-icon ${state.activeLinks.home ? "activeLink" : "unActiveLink"}`} />
            </div>
            <div>
                <GoSearch className={`search-icon ${state.activeLinks.search ? "activeLink" : "unActiveLink"}`} onClick={SearchLoadingHandler} />

                <RiSettings3Fill className={`settings-icon ${state.activeLinks.settings ? "activeLink" : "unActiveSettingsLink"}`} onClick={settingsLoadingHandler} />
            </div>
        </div>
    );
}

export default NavBar;
