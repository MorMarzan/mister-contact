import { contactService } from "../../services/contact.service.js"

export const SET_CONTACTS = 'SET_CONTACTS'
export const REMOVE_CONTACT = 'REMOVE_CONTACT'
export const ADD_CONTACT = 'ADD_CONTACT'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SORT_BY = 'SET_SORT_BY'
export const UPDATE_MSG = 'UPDATE_MSG'
export const ADD_MSG = 'ADD_MSG'

export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    contacts: [],
    isLoading: false,
    filterBy: contactService.getDefaultFilter(),
    sortBy: { type: '', dir: 1 }
}

export function contactReducer(state = initialState, action = {}) {

    let contacts
    switch (action.type) {
        case SET_CONTACTS:
            return { ...state, contacts: action.contacts }

        case REMOVE_CONTACT:
            contacts = state.contacts.filter(contact => contact._id !== action.contactId)
            return { ...state, contacts }

        case ADD_CONTACT:
            contacts = [...state.contacts, action.contact]
            return { ...state, contacts }

        case UPDATE_CONTACT:
            contacts = state.contacts.map(contact => contact._id === action.contact._id ? action.contact : contact)
            return { ...state, contacts }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        case SET_SORT_BY:
            return { ...state, sortBy: { ...state.sortBy, ...action.sortBy } }

        case ADD_MSG:
            const contacts = state.contacts.map(contact => {
                if (contact._id === action.contactId) {
                    const updatedMsgs = contact.msgs ? [...contact.msgs, action.msg] : [action.msg]
                    // console.log('updated contact with msg from reducer', { ...contact, msgs: updatedMsgs })
                    return { ...contact, msgs: updatedMsgs }
                }
                return contact
            })
            return { ...state, contacts }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state
    }
}
