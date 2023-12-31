import { useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { useEffectUpdate } from "./customHooks/useEffectUpdate.js"

export function ContactFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilter = useRef(utilService.debounce(onSetFilterBy, 500))

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'radio':
                value = target.id
                break

            default:

                break
        }
        console.log('wtf');

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <div className="contact-filter">

            <h3>Filter Contacts:</h3>
            <form>

                <label>Name: <input type="text" name="name" placeholder="Name" value={filterByToEdit.name} onChange={handleChange} /></label>
                <label>Tel: <input type="text" name="tel" placeholder="Tel" value={filterByToEdit.tel || ''} onChange={handleChange} /></label>

            </form>
        </div>
    )
}
