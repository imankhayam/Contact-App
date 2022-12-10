import React from "react";
import { useInitialState } from "../provider/ContextProvider";
import "../sass/loadingAnimate.scss";

function LoadingAnimation() {
    const state = useInitialState();

    const loadingRender = () => {
        let loadingAnimat;
        if (state.loadingPage) {
            loadingAnimat = <div className="loading-mount"></div>;
            return loadingAnimat;
        } else if (state.loadingPage === false) {
            loadingAnimat = <div className="loading-unmount"></div>;
            return loadingAnimat;
        } else {
            loadingAnimat = null;
            return loadingAnimat;
        }
    };

    return <div className={`loading-${state.settings.theme}`}>{loadingRender()}</div>;
}

export default LoadingAnimation;
