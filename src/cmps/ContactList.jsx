// import { ContactPreview } from "./ContactPreview.jsx";
// const { Link } = ReactRouterDOM

import { Link } from "react-router-dom";
import { ContactPreview } from "./ContactPreview";
// import { ContactPreview } from "./ContactPreview";

export function ContactList({ contacts, onRemoveContact }) {

    if (!contacts) return <div>Loading...</div>
    if (!contacts.length) return <h3>No contact match the filter</h3>

    return (
        <ul className="contact-list" >
            {contacts.map(contact =>
                <li className="contact-item" key={contact._id}>
                    <ContactPreview contact={contact} />
                    <section className="tools">
                        <Link className="btn" to={`/contact/${contact._id}`}>Details</Link>
                        <Link className="btn" to={`/contact/edit/${contact._id}`}>Edit</Link>
                        <button className="btn" onClick={() => onRemoveContact(contact._id)}>X</button>
                    </section>
                </li>
            )}
        </ul>
    )
}