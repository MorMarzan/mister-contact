import { useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"

import { loadContacts, removeContact, setFilterBy, setSortBy } from "../store/actions/contact.actions"
import { utilService } from "../services/util.service"
import { ContactList } from "../cmps/ContactList"
import { ContactFilter } from "../cmps/ContactFilter"

export function ContactIndex() {

    const contacts = useSelector(storeState => storeState.contactModule.contacts)
    const filterBy = useSelector((storeState) => storeState.contactModule.filterBy)



    useEffect(() => {
        const fetchData = async () => {
            try {
                await _loadContacts()
            } catch (error) {
                showErrorMsgRedux('Cannot show toys')
            }
        }

        fetchData()
    }, [filterBy])

    async function _loadContacts() {
        try {
            await loadContacts()
        } catch (error) {
            console.error('Error loading contacts:', error)
        }
    }

    console.log('contacts', contacts)

    async function onRemoveContact(contactId) {
        try {
            await removeContact(contactId)
        } catch (err) {
            console.log('Cannot remove contact', err)
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }


    return (
        <section className="contact-index main-layout full page">
            <ContactFilter
                filterBy={filterBy}
                onSetFilterBy={onSetFilter}
            />

            <Link to='/contact/edit'><button>Add Contact</button></Link>

            <ContactList contacts={contacts} onRemoveContact={onRemoveContact} />
        </section>
    )

}