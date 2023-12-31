import { useSelector } from "react-redux"
import { useEffect, useRef } from "react"
// import { Link } from "react-router-dom"

// import { ContactList } from "../cmps/ContactList"
// import { ContactFilter } from "../cmps/ContactFilter"
// import { ContactSort } from "../cmps/ContactSort"
import { loadContacts, removeContact, setFilterBy, setSortBy } from "../store/actions/contact.actions"
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { utilService } from "../services/util.service"
import { ContactList } from "../cmps/ContactList"
import { ContactFilter } from "../cmps/ContactFilter"

export function ContactIndex() {

    const contacts = useSelector(storeState => storeState.contactModule.contacts)
    const filterBy = useSelector((storeState) => storeState.contactModule.filterBy)
    // const filterBy = useSelector(storeState => storeState.contactModule.filterBy)
    // const sortBy = useSelector(storeState => storeState.contactModule.sortBy)


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
    // }, [filterBy, sortBy])

    async function _loadContacts() {
        try {
            await loadContacts()
        } catch (error) {
            console.error('Error loading contacts:', error)
            // showErrorMsg('Cannot show contacts')
        }
    }

    console.log('contacts', contacts)

    async function onRemoveContact(contactId) {
        try {
            await removeContact(contactId)
            // showSuccessMsg('Contact removed')
        } catch (err) {
            console.log('Cannot remove contact', err)
            // showErrorMsg('Cannot remove contact')
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    // function onSetSortBy(sortBy) {
    //     setSortBy(sortBy)
    // }

    // const { name, tel } = filterBy


    return (
        <section className="contact-index main-layout full">
            <ContactFilter
                filterBy={filterBy}
                onSetFilterBy={onSetFilter}
            />

            <ContactList contacts={contacts} onRemoveContact={onRemoveContact} />
        </section>
    )

}