import React from "react";
import "../sass/settings.scss";
import { IoMdAddCircle } from "react-icons/io";
import { useInitialState, useInitialStateActions } from "../provider/ContextProvider";
import { useNavigate } from "react-router-dom";

function Settings() {
    const navigate = useNavigate();

    const state = useInitialState();
    const setState = useInitialStateActions();

    React.useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                activeLinks: {
                    settings: true,
                },
            };
        });
        if (state.loadingPage === true) {
            setState((prevState) => {
                return { ...prevState, loadingPage: false };
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const pageLoadingHandler = () => {
        setState((prevState) => {
            return { ...prevState, loadingPage: true };
        });
        setTimeout(() => {
            navigate("/");
        }, 400);
    };

    const darkModeHandler = () => {
        setState((prevState) => {
            localStorage.setItem("mySettings", JSON.stringify({ ...prevState.settings, darkMode: !prevState.settings.darkMode }));
            return { ...prevState, settings: { ...prevState.settings, darkMode: !prevState.settings.darkMode } };
        });
    };

    const themeChangeHandler = (color) => {
        setState((prevState) => {
            localStorage.setItem("mySettings", JSON.stringify({ ...prevState.settings, theme: color }));
            return { ...prevState, settings: { ...prevState.settings, theme: color } };
        });
    };

    return (
        <div className={`settings-container-${state.settings.darkMode ? "dark" : "light"}-${state.settings.theme}`}>
            <div className="cancel-settings">
                <button onClick={pageLoadingHandler}>
                    <IoMdAddCircle className="cancel-settings-btn" />
                </button>
                <p>Cancel</p>
            </div>
            <div className="dark-mode-container">
                <div className="dark-mode">
                    <p>Dark Mode</p>
                    <div className={state.settings.darkMode ? "checkbox-background-checked" : "checkbox-background"} onClick={darkModeHandler}>
                        <div className={state.settings.darkMode ? "checkbox-btn-checked" : "checkbox-btn"}></div>
                    </div>
                </div>
                <div className="horz-line"></div>
            </div>
            <div className="theme-container">
                <p className="theme-title">Theme</p>
                <div className="theme-options">
                    <div className="theme-option" onClick={() => themeChangeHandler("red")}>
                        <span>Red</span>
                        <div className={state.settings.theme === "red" ? "radio-background-checked" : "radio-background"}>
                            <div className={state.settings.theme === "red" ? null : "radio-btn"}></div>
                        </div>
                    </div>
                    <div className="theme-option" onClick={() => themeChangeHandler("purple")}>
                        <span>Purple</span>
                        <div className={state.settings.theme === "purple" ? "radio-background-checked" : "radio-background"}>
                            <div className={state.settings.theme === "purple" ? null : "radio-btn"}></div>
                        </div>
                    </div>
                    <div className="theme-option" onClick={() => themeChangeHandler("green")}>
                        <span>Green</span>
                        <div className={state.settings.theme === "green" ? "radio-background-checked" : "radio-background"}>
                            <div className={state.settings.theme === "green" ? null : "radio-btn"}></div>
                        </div>
                    </div>
                    <div className="theme-option" onClick={() => themeChangeHandler("yellow")}>
                        <span>Yellow</span>
                        <div className={state.settings.theme === "yellow" ? "radio-background-checked" : "radio-background"}>
                            <div className={state.settings.theme === "yellow" ? null : "radio-btn"}></div>
                        </div>
                    </div>
                </div>
                <div className="horz-line"></div>
            </div>
        </div>
    );
}

export default Settings;
