import React, { useEffect } from "react";
import { useInitialState, useInitialStateActions } from "../provider/ContextProvider";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import "../sass/search.scss";

function Search() {
    const navigate = useNavigate();

    const state = useInitialState();
    const setState = useInitialStateActions();

    const [allContacts, setAllContacts] = React.useState("");
    const [search, setSearch] = React.useState("");
    const [searchResults, setSearchResults] = React.useState(null);

    useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                activeLinks: {
                    search: true,
                },
            };
        });
        if (state.loadingPage === true) {
            setState((prevState) => {
                return { ...prevState, loadingPage: false };
            });
        }

        const contactsFetch = () => {
            const myContacts = JSON.parse(localStorage.getItem("myContacts"));
            setAllContacts(myContacts);
        };
        contactsFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (search) {
            const searchFilter = allContacts.filter((contact) => {
                return Object.values(contact).join(" ").toLowerCase().includes(search.toLowerCase());
            });
            setSearchResults(searchFilter);
        } else {
            setSearchResults(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const pageLoadingHandler = () => {
        setState((prevState) => {
            return { ...prevState, loadingPage: true };
        });
        setTimeout(() => {
            navigate("/");
        }, 400);
    };

    const searchInputHandler = (e) => {
        setSearch(e.target.value);
    };

    const searchResultsRender = () => {
        let results;
        if (searchResults !== null && searchResults.length !== 0) {
            results = searchResults.map((contact) => {
                return (
                    <div className="search-result" key={contact.id} onClick={() => navigateHandler(contact.id)}>
                        <div className="search-result-name">
                            <div className="name">
                                <p>{contact.firstName}</p>
                                <p>{contact.lastName}</p>
                            </div>
                            <p className="number">{contact.phoneNumber}</p>
                        </div>
                        <div className="result-horz-line"></div>
                    </div>
                );
            });
            return results;
        } else if (search) {
            results = <div className="no-search-result">no contact found !!!</div>;
            return results;
        }
    };

    const navigateHandler = (id) => {
        setState((prevState) => {
            return { ...prevState, loadingPage: true };
        });
        setTimeout(() => {
            navigate(`/contactDetails/${id}`);
        }, 400);
    };

    return (
        <div className={`search-container-${state.settings.darkMode ? "dark" : "light"}-${state.settings.theme}`}>
            <div className="cancel-search-contact">
                <button onClick={pageLoadingHandler}>
                    <IoMdAddCircle className="cancel-search-contact-btn" />
                </button>
                <p>Cancel</p>
            </div>
            <div className="search-input-container">
                <div className="search-section">
                    <BsSearch className="search-icon" />
                    <input type="text" className="search-input" placeholder="type to search ..." value={search} onChange={searchInputHandler} />
                </div>
                <div className="horz-line"></div>
            </div>
            <div className="search-results">{searchResultsRender()}</div>
        </div>
    );
}

export default Search;
