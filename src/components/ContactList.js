import React from "react";
import contactIcon from "../icons/Vector_9.png";
import { useNavigate } from "react-router-dom";
import { useInitialStateActions } from "../provider/ContextProvider";

function ContactList({ contact }) {
    const { firstName, lastName, email, phoneNumber, id } = contact;
    const navigate = useNavigate();

    const setState = useInitialStateActions();

    const navigateHandler = () => {
        setState((prevState) => {
            return { ...prevState, loadingPage: true };
        });
        setTimeout(() => {
            navigate(`/contactDetails/${id}`);
        }, 400);
    };

    return (
        <div onClick={navigateHandler} className="contact-list" style={{ animationDelay: `${id < 6 ? id * 100 : 500}ms` }}>
            <div className="contact-image">
                <img src={contactIcon} alt="contactIcon" />
            </div>
            <div className="contact-details-container">
                <div className="contact-name">
                    <span>{firstName}</span>
                    <span>{lastName}</span>
                </div>
                <div className="contact-email">
                    <span>{email}</span>
                </div>
                <div className="contact-number">
                    <span>{phoneNumber}</span>
                </div>
            </div>
        </div>
    );
}

export default ContactList;
