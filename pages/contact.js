import Head from "next/head";
import { Fragment } from "react";
import ContactForm from "../components/contact/contact-form";

export default function ContactPage() {
    return (
        <Fragment>
            <Head>
                <title>Contact Me</title>
                <meta
                    name="description"
                    content="Send me your messages!"
                ></meta>
            </Head>
            <ContactForm />
        </Fragment>
    );
}
