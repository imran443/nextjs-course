import { useState, useEffect } from "react";
import Notification from "../../ui/notification";
import classes from "./contact-form.module.css";

async function sendContactData(contactDetails) {
    const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(contactDetails),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }
}

export default function ContactForm() {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredName, setEnteredName] = useState("");
    const [enteredMessage, setEnteredMessage] = useState("");
    const [requestStatus, setRequestStatus] = useState(); // 'pending, 'success' and 'error'
    const [requestError, setRequestError] = useState();

    useEffect(() => {
        if (requestStatus === "success" || requestStatus === "error") {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    async function sendMessageHandler(event) {
        event.preventDefault();

        setRequestStatus("pending");

        try {
            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage,
            });

            setRequestStatus("success");
            setEnteredMessage("");
            setEnteredEmail("");
            setEnteredName("");
        } catch (error) {
            setRequestError(error.message);
            setRequestStatus("error");
        }
    }

    let notification;

    if (requestStatus === "pending") {
        notification = {
            status: "pending",
            title: "Sending a message...",
            message: "Your message is on its way!",
        };
    }

    if (requestStatus === "success") {
        notification = {
            status: "success",
            title: "Success!",
            message: "Message sent successfully!",
        };
    }

    if (requestStatus === "error") {
        notification = {
            status: "error",
            title: "Success!",
            message: requestError,
        };
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form onSubmit={sendMessageHandler} className={classes.form}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            value={enteredEmail}
                            onChange={(event) =>
                                setEnteredEmail(event.target.value)
                            }
                            required
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="name"
                            id="name"
                            required
                            value={enteredName}
                            onChange={(event) =>
                                setEnteredName(event.target.value)
                            }
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        value={enteredMessage}
                        onChange={(event) =>
                            setEnteredMessage(event.target.value)
                        }
                        id="message"
                        rows="5"
                    ></textarea>
                </div>

                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    );
}
