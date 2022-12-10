import React from "react";
import ContactList from "../components/ContactList";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useInitialState, useInitialStateActions } from "../provider/ContextProvider";

function Contacts() {
    const navigate = useNavigate();
    const [allContacts, setAllContacts] = React.useState([]);

    const state = useInitialState();
    const setState = useInitialStateActions();

    React.useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                activeLinks: {
                    home: true,
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

    const contactsRender = () => {
        let contactsInfo;
        if (allContacts) {
            contactsInfo = allContacts.map((contact) => {
                return <ContactList key={contact.id} contact={contact} />;
            });
            return contactsInfo;
        }
    };

    const pageLoadingHandler = () => {
        setState((prevState) => {
            return { ...prevState, loadingPage: true };
        });
        setTimeout(() => {
            navigate("/addContact");
        }, 400);
    };

    return (
        <div className="contacts">
            <div className="add-contact">
                <button onClick={pageLoadingHandler}>
                    <IoMdAddCircle className="add-contact-btn" />
                </button>
                <p>Add Contact</p>
            </div>
            <h2>Contacts</h2>
            <div className="contact-list-container">{contactsRender()}</div>
        </div>
    );
}

export default Contacts;
