import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { loadContact } from "../store/actions/contact.actions"
import { showErrorMsgRedux } from "../store/actions/app.actions"

export function ContactDetails() {
    const [contact, setContact] = useState(null)
    const { contactId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        _loadContact()
    }, [contactId])

    async function _loadContact() {
        try {
            const contact = await loadContact(contactId)
            setContact(contact)
        } catch (error) {
            console.log('Had issues in toy details', error)
            showErrorMsgRedux('Cannot load contact')
            navToIndex()
        }
    }

    function navToIndex() {
        navigate('/contact')
    }

    if (!contact) return <div>Loading...</div>
    return (
        <section className="contact-details">
            <h1>Contact Details</h1>

            <h2>Name: {contact.name}</h2>
            <h2>Tel: {contact.tel}</h2>
        </section>
    )
}
