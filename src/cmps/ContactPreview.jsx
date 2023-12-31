
// import dollPng from '../assets/img/bear.png'
import maleSvg from '../../public/avatar-male.svg'
import femaleSvg from '../../public/avatar-female.svg'
import { utilService } from '../services/util.service'

export function ContactPreview({ contact }) {

    const { name, tel } = contact

    return (
        <article className="contact-preview" >
            <h3>{utilService.capitalizeFirstLetter(name)}</h3>
            <h4>{tel}</h4>
            <img src={maleSvg} />
        </article>
    )
}