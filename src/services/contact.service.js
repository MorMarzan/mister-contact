import { storageService } from './async-storage.service.js'
const STORAGE_KEY = 'contactDB'

export const contactService = {
    query,
    getById,
    save,
    remove,
    getEmptyContact,
    getDefaultFilter,
}

_createContacts()

async function query(filterBy = {}) {
    try {
        if (!filterBy.name) filterBy.name = ''
        if (!filterBy.tel) filterBy.tel = ''
        if (!filterBy.gender) filterBy.gender = 'all'
        const nameRegExp = new RegExp(filterBy.name, 'i')
        const telRegExp = new RegExp(filterBy.tel, 'i')

        var contacts = await storageService.query(STORAGE_KEY)
        contacts = contacts.filter(contact => nameRegExp.test(contact.name) && telRegExp.test(contact.tel))
        if (filterBy.gender !== 'all') contacts = contacts.filter(contact => contact.gender === filterBy.gender)
        return contacts
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
        tel: '',
        gender: 'm'
    }
}

function getDefaultFilter() {
    return { name: '', tel: '', gender: 'all' }
}

function _createContacts() {
    const contactsFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!contactsFromStorage || !contactsFromStorage.length) {

        const contacts = [
            {
                name: 'Mor Marzan',
                tel: '1234567890',
                _id: '123',
                gender: 'f'
            },
            {
                name: 'Eden Rize',
                tel: '9876543210',
                _id: '555',
                gender: 'f'
            },
            {
                name: 'Noam Saar',
                tel: '1213141516',
                _id: '789',
                gender: 'f'
            },
            {
                name: 'Sharon Frankel',
                tel: '5556667778',
                _id: 'g78',
                gender: 'm'
            },
        ]

        localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
    }
}