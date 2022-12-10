import React from "react";
import "../sass/contactDetails.scss";
import { SiHomebridge } from "react-icons/si";
import { useInitialState, useInitialStateActions } from "../provider/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { HiOutlineMail, HiOutlineUserCircle, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import contactIcon from "../icons/Vector_9.png";

function ContactDetails() {
    const state = useInitialState();
    const setState = useInitialStateActions();

    const navigate = useNavigate();
    const params = useParams();

    const [contactDetails, setContactDetails] = React.useState(null);

    React.useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                activeLinks: {
                    contactDetails: true,
                },
            };
        });
        if (state.loadingPage === true) {
            setState((prevState) => {
                return { ...prevState, loadingPage: false };
            });
        }
        const myContacts = JSON.parse(localStorage.getItem("myContacts"));
        const getOneContact = myContacts.filter((contact) => contact.id === parseInt(params.id));
        setContactDetails(getOneContact[0]);
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

    const contactDeleteHandler = (id) => {
        const myContacts = JSON.parse(localStorage.getItem("myContacts"));
        const deleteContact = myContacts.filter((contact) => contact.id !== id);
        localStorage.setItem("myContacts", JSON.stringify(deleteContact));
        setState((prevState) => {
            return { ...prevState, loadingPage: true };
        });
        setTimeout(() => {
            navigate("/");
        }, 400);
    };

    const ContactDetailsRender = () => {
        let details;
        if (contactDetails) {
            details = (
                <div className="contact-details">
                    <div className="contact-details-image-container">
                        <div className="contact-details-image">
                            <img src={contactIcon} alt="contactIcon" />
                        </div>
                    </div>
                    <main>
                        <div className="add-contact-line"></div>
                        <div className="contact-delete">
                            <MdDelete className="contact-delete-icon" onClick={() => contactDeleteHandler(contactDetails.id)} />
                        </div>
                        <div className="contact-name">
                            <HiOutlineUserCircle />
                            <p className="contact-firstName">{contactDetails.firstName}</p>
                            <p>{contactDetails.lastName}</p>
                        </div>
                        <div className="contact-email">
                            <HiOutlineMail />
                            <p>{contactDetails.email}</p>
                        </div>
                        <div className="contact-phone">
                            <HiOutlinePhone />
                            <p>{contactDetails.phoneNumber}</p>
                        </div>
                        <div className="contact-address">
                            <HiOutlineLocationMarker />
                            <p className="contact-location">{contactDetails.address ? contactDetails.address : "-"}</p>
                            <p>{contactDetails.zipCode}</p>
                        </div>
                    </main>
                </div>
            );
            return details;
        }
    };

    return (
        <div className={`contact-details-${state.settings.darkMode ? "dark" : "light"}-${state.settings.theme}`}>
            <div className="navigate-home">
                <button onClick={pageLoadingHandler}>
                    <SiHomebridge className="navigate-home-btn" />
                </button>
                <p>Home</p>
            </div>
            {ContactDetailsRender()}
        </div>
    );
}

export default ContactDetails;
