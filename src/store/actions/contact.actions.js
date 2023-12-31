import { contactService } from "../../services/contact.service.js"
import { ADD_CONTACT, REMOVE_CONTACT, SET_CONTACTS, UPDATE_CONTACT, SET_FILTER_BY, SET_SORT_BY } from "../reducers/contact.reducer.js"
import { store } from "../store.js"

export async function loadContacts() {
    const filterBy = store.getState().contactModule.filterBy
    console.log('filterBy', filterBy)

    const sortBy = store.getState().contactModule.sortBy
    try {
        const contacts = await contactService.query(filterBy, sortBy)
        store.dispatch({ type: SET_CONTACTS, contacts })
    } catch (err) {
        console.log('contact action -> Cannot load contacts', err)
        throw err
    }
}

export async function loadContact(contactId) {
    try {
        const contact = await contactService.getById(contactId)
        return contact
    } catch (err) {
        console.log('contact action -> Cannot load contacts', err)
        throw err
    }
}

export async function removeContact(contactId) {
    try {
        await contactService.remove(contactId)
        store.dispatch({ type: REMOVE_CONTACT, contactId })
    } catch (err) {
        console.error('contact action -> Cannot remove contact', err)
        throw err
    }
}

export async function saveContact(contact) {
    const type = contact._id ? UPDATE_CONTACT : ADD_CONTACT
    try {
        const contactToSave = await contactService.save(contact)
        store.dispatch({ type, contact: contactToSave })
        return contactToSave
    } catch (err) {
        console.error('contact action -> Cannot save contact', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSortBy(sortBy) {
    store.dispatch({ type: SET_SORT_BY, sortBy })
}