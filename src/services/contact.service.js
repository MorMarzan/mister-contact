import { storageService } from './async-storage.service.js'
const STORAGE_KEY = 'contactDB'

export const contactService = {
    query,
    getById,
    save,
    remove,
    getEmptyContact,
    // getDefaultFilter,
}

_createContacts()

async function query(filterBy = {}) {
    try {
        if (!filterBy.txt) filterBy.txt = ''
        const regExp = new RegExp(filterBy.txt, 'i')

        const contacts = await storageService.query(STORAGE_KEY)
        return contacts.filter(contact => regExp.test(contact.name))
    } catch (error) {
        console.log('An error occurred during the query:', error)
        throw error
    }
}


async function getById(contactId) {
    try {
        return await storageService.get(STORAGE_KEY, contactId)
    } catch (error) {
        console.log('An error occurred during the query:', error)
        throw error
    }
}

async function remove(contactId) {
    try {
        return await storageService.remove(STORAGE_KEY, contactId)
    } catch (error) {
        console.log('An error occurred during the query:', error)
        throw error
    }
}

async function save(contact) {
    try {
        if (contact._id) {
            return await storageService.put(STORAGE_KEY, contact)
        } else {
            return await storageService.post(STORAGE_KEY, contact)
        }
    } catch (error) {
        console.log('An error occurred during the query:', error)
        throw error
    }

}

function getEmptyContact() {
    return {
        name: 'New Contact',
        tel: ''
    }
}

// function getDefaultFilter() {
//     return { txt: '', maxPrice: '', labels: [], inStock: 'all', sortBy: 'createdAt' }
// }

function _createContacts() {
    const contactsFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!contactsFromStorage || !contactsFromStorage.length) {

        const contacts = [
            {
                name: 'Mor Marzan',
                tel: 1234567890
            },
            {
                name: 'Eden Rize',
                tel: 9876543210
            },
            {
                name: 'Noam Saar',
                tel: 1213141516
            },
        ]

        localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
    }
}