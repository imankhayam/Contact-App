import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { useInitialState, useInitialStateActions } from "../provider/ContextProvider";
import "../sass/addContact.scss";

function AddContact() {
    const navigate = useNavigate();

    const state = useInitialState();
    const setState = useInitialStateActions();

    React.useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                activeLinks: {
                    addContact: true,
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

    const [contactDetails, setContactDetails] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        zipCode: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        if (contactDetails.firstName !== "" && contactDetails.lastName !== "" && contactDetails.email !== "" && contactDetails.phoneNumber !== "") {
            const postContactsData = () => {
                const myContacts = JSON.parse(localStorage.getItem("myContacts"));
                if (myContacts) {
                    localStorage.setItem("myContacts", JSON.stringify([...myContacts, { ...contactDetails, id: myContacts.length + 1 }]));
                } else {
                    localStorage.setItem("myContacts", JSON.stringify([{ ...contactDetails, id: 1 }]));
                }
                setState((prevState) => {
                    return { ...prevState, loadingPage: true };
                });
                setTimeout(() => {
                    navigate("/");
                }, 400);
            };
            postContactsData();
        }
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setContactDetails((prevState) => {
            return { ...prevState, [name]: value };
        });
    };

    const numberChangeHandler = (e) => {
        const { name, value } = e.target;
        setContactDetails((prevState) => {
            if (e.target.validity.valid) {
                return { ...prevState, [name]: value };
            } else {
                return prevState;
            }
        });
    };

    const pageLoadingHandler = () => {
        setState((prevState) => {
            return { ...prevState, loadingPage: true };
        });
        setTimeout(() => {
            navigate("/");
        }, 400);
    };

    return (
        <div className={`add-contact-${state.settings.darkMode ? "dark" : "light"}-${state.settings.theme}`}>
            <div className="cancel-add-contact">
                <button onClick={pageLoadingHandler}>
                    <IoMdAddCircle className="cancel-add-contact-btn" />
                </button>
                <p>Cancel</p>
            </div>
            <h2>Add your Contact</h2>
            <div className="add-contact-from-container">
                <div className="add-contact-line"></div>

                <form className="add-contact-form" onSubmit={submitHandler}>
                    <div className="add-contact-input-container">
                        <input type="text" className="add-contact-input firstName" placeholder="first name" onChange={changeHandler} value={contactDetails.firstName} name="firstName" />
                        <input type="text" className="add-contact-input lastName" placeholder="last name" onChange={changeHandler} value={contactDetails.lastName} name="lastName" />
                    </div>
                    <div className="add-contact-input-container">
                        <input type="text" className="add-contact-input email" placeholder="email" onChange={changeHandler} value={contactDetails.email} name="email" />
                    </div>
                    <div className="add-contact-input-container">
                        <input
                            type="text"
                            maxLength={11}
                            pattern="[0-9]*"
                            className="add-contact-input phone"
                            placeholder="phone number"
                            onChange={numberChangeHandler}
                            value={contactDetails.phoneNumber}
                            name="phoneNumber"
                        />
                    </div>
                    <div className="add-contact-input-container">
                        <input type="text" className="add-contact-input address" placeholder="address" onChange={changeHandler} value={contactDetails.address} name="address" />
                        <input
                            type="text"
                            maxLength={5}
                            pattern="[0-9]*"
                            className="add-contact-input zipCode"
                            placeholder="zip code"
                            onChange={numberChangeHandler}
                            value={contactDetails.zipCode}
                            name="zipCode"
                        />
                    </div>
                    <button type="submit" className="add-contact-btn">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddContact;
