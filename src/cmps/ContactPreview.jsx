
import maleSvg from '../../public/avatar-male.svg'
import femaleSvg from '../../public/avatar-female.svg'
import { utilService } from '../services/util.service'

export function ContactPreview({ contact }) {

    const { name, tel, gender } = contact

    return (
        <article className="contact-preview" >
            {(gender === 'f') && <span><img src={femaleSvg} /></span>}
            {(gender === 'm') && <span><img src={maleSvg} /></span>}
            <h3>
                {utilService.capitalizeFirstLetter(name)}
            </h3>
            <a href={`tel:${tel}`}>{tel}</a>
        </article>
    )
}