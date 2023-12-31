
import * as yup from 'yup'

import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { showErrorMsgRedux, showSuccessMsgRedux } from '../store/actions/app.actions.js'

import { contactService } from '../services/contact.service.js'
import { loadContact, saveContact } from '../store/actions/contact.actions.js'

export function ContactEdit() {
    const [contactToEdit, setContactToEdit] = useState(contactService.getEmptyContact())
    const [selectedGender, setSelectedGender] = useState(contactToEdit.gender || '')

    const { contactId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (contactId) _loadContact()
    }, [])

    async function _loadContact() {
        try {
            const loadedContact = await loadContact(contactId)
            setContactToEdit(loadedContact)
        } catch (err) {
            console.error('Error loading contact:', err)
            navigate('/contact')
            showErrorMsgRedux('Contact not found!')
        }
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value || '' : target.value

        if (field === 'gender') {
            setSelectedGender(value)
        }

        setContactToEdit((prevContact) => ({ ...prevContact, [field]: value }))
    }

    async function onSaveContact(ev) {
        ev.preventDefault()
        const schema = yup.object().shape({
            name: yup.string().required('Contact Name is required'),
            price: yup.number().required('Contact Tel is required').positive('Tel must be positive'),
        })
        try {
            await schema.validate(contactToEdit, { abortEarly: false })
            try {
                await saveContact(contactToEdit)
                showSuccessMsgRedux('Contact has been saved!')
                navigate('/contact')
            } catch (err) {
                console.error('Cannot add/edit contact', err)
                showErrorMsgRedux('Cannot add/edit contact')
            }
        } catch (validationErrors) {
            console.error(validationErrors)
            showErrorMsgRedux('Validation errors')
        }
    }

    return (
        <section className="contact-edit">
            <h2>{contactToEdit._id ? 'Edit' : 'Add'} Contact</h2>
            <form onSubmit={onSaveContact}>
                <label htmlFor="txt">Contact Name:</label>
                <input
                    onChange={handleChange}
                    placeholder='New contact'
                    value={contactToEdit.name}
                    type="text"
                    name="name"
                    id="txt"
                />
                <label htmlFor="tel">Contact Tel:</label>
                <input
                    onChange={handleChange}
                    placeholder='Tel...'
                    value={contactToEdit.tel}
                    type="number"
                    name="tel"
                    id="tel"
                />
                <div>
                    <label>Gender:</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="m"
                            checked={selectedGender === 'm'}
                            onChange={handleChange}
                        />{' '}
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="f"
                            checked={selectedGender === 'f'}
                            onChange={handleChange}
                        />{' '}
                        Female
                    </label>
                    {/* Add more options if needed */}
                </div>
                <button>{contactToEdit._id ? 'Edit' : 'Add'} Contact</button>
            </form>
        </section>
    )
}
