import React from "react";

const contextProvider = React.createContext();
const contextProviderDispatcher = React.createContext();

const initialState = {
    settings: { darkMode: false, theme: "red" },
    loadingPage: null,
    activeLinks: {
        home: true,
    },
};

function ContextProvider({ children }) {
    const [state, setState] = React.useState(initialState);
    return (
        <contextProvider.Provider value={state}>
            <contextProviderDispatcher.Provider value={setState}>{children}</contextProviderDispatcher.Provider>
        </contextProvider.Provider>
    );
}

export default ContextProvider;

export const useInitialState = () => React.useContext(contextProvider);

export const useInitialStateActions = () => React.useContext(contextProviderDispatcher);
