import Axios from 'axios'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'

// for cookies
// const axios = Axios.create({
//     withCredentials: true
// })

const BASE_URL = 'contact/'
const STORAGE_KEY = 'contactDB'



export const contactService = {
    query,
    getById,
    save,
    // addContactMsg,
    remove,
    getEmptyContact,
    // getDefaultFilter,
    // getLabels,
}

_createContacts()

async function query(filterBy = {}) {
    if (!filterBy.txt) filterBy.txt = ''
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    const regExp = new RegExp(filterBy.txt, 'i')

    return storageService.query(STORAGE_KEY)
        .then(contacts => {
            return contacts.filter(contact =>
                regExp.test(contact.name) &&
                contact.price <= filterBy.maxPrice
            )
        })
    // try {
    //     return await httpService.get(BASE_URL, filterBy)
    // } catch (error) {
    //     throw new Error(error.message || 'An error occurred during getting contacts')
    // }
}

async function getById(contactId) {
    return storageService.get(STORAGE_KEY, contactId)
    // try {
    //     return await httpService.get(BASE_URL + contactId)
    // } catch (error) {
    //     throw new Error(error.message || 'An error occurred during getting contact')

    // }
}

async function remove(contactId) {
    return storageService.remove(STORAGE_KEY, contactId)
    // try {
    //     return await httpService.delete(BASE_URL + contactId)

    // } catch (error) {
    //     throw new Error(error.message || 'An error occurred during removing contact')

    // }
}

async function save(contact) {
    // try {

    if (contact._id) {
        return storageService.put(STORAGE_KEY, contact)
        // return await httpService.put(BASE_URL, contact)
    } else {
        return storageService.post(STORAGE_KEY, contact)
        // return await httpService.post(BASE_URL, contact)
    }
    // } catch (error) {

    // throw new Error(error.message || 'An error occurred during saving contact')
    // }
}

// async function addContactMsg(contactId, txt) {
//     try {
//         return await httpService.post(`${BASE_URL}${contactId}/msg`, { txt })
//     } catch (error) {
//         throw new Error(error.message || 'An error occurred during adding msg')

//     }
// }


function getEmptyContact() {
    return {
        name: 'New Contact',
        price: utilService.getRandomIntInclusive(15, 200),
        labels: [...labels].splice(utilService.getRandomIntInclusive(0, labels.length - 4), 3),
        inStock: true,
        img: utilService.getRandomIntInclusive(1, 10),
        msgs: []
    }
}

// function getLabels() {
//     return [...labels]
// }


// function getDefaultFilter() {
//     return { txt: '', maxPrice: '', labels: [], inStock: 'all', sortBy: 'createdAt' }
// }

function _createContacts() {
    const contactsFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!contactsFromStorage || !contactsFromStorage.length) {
        const contacts = [
            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: false,
                img: 8
            },
            {
                _id: 't102',
                name: 'Building Blocks Set',
                price: 45,
                labels: ['Puzzle', 'Outdoor'],
                createdAt: 1631031801022,
                inStock: true,
                img: 10
            },
            {
                _id: 't103',
                name: 'Remote Control Car',
                price: 89,
                labels: ['Box game', 'Battery Powered'],
                createdAt: 1631031801033,
                inStock: true,
                img: 7
            },
            {
                _id: 't104',
                name: 'Rubber Duck',
                price: 30,
                labels: ['On wheels', 'Art'],
                createdAt: 1631031801044,
                inStock: false,
                img: 3
            },
            {
                _id: 't105',
                name: 'Talking Robot',
                price: 20,
                labels: ['Outdoor', 'Art'],
                createdAt: 1631031801055,
                inStock: true,
                img: 9
            },
            {
                _id: 't106',
                name: 'Stuffed Animal - Teddy Bear',
                price: 15,
                labels: ['Puzzle', 'Doll'],
                createdAt: 1631031801066,
                inStock: true,
                img: 4
            },
            {
                _id: 't107',
                name: 'Contact Train',
                price: 35,
                labels: ['Doll', 'Battery Powered'],
                createdAt: 1631031801077,
                inStock: true,
                img: 5
            }
        ]

        localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
    }
}