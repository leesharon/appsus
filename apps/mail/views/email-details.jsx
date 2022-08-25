import { utilService } from "../../../services/util.service.js"
import { emailService } from "../services/email.service.js"

export class EmailDetails extends React.Component {

    state = {
        email: null
    }

    render() {
        const { email, onRemoveEmail } = this.props
        const sentAt = utilService.getDatePreview(email.sentAt)

        return <React.Fragment>
            <tr className="email-details">
                <td colSpan={8}>
                <h2>{email.subject}</h2><i onClick={() => {onRemoveEmail(email.id)}} className="remove-email fa-solid fa-trash-can"></i>
                <h4>from: {email.from} {sentAt}</h4>
                <p>{email.body}</p>
                <button className="btn btn-respond">Respond</button>
                <button className="btn btn-forward">Forward</button>
                </td>
            </tr>
        </React.Fragment>
    }
}