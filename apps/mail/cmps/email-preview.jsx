import { utilService } from "../../../services/util.service.js";
const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component {

    render() {
        const { email } = this.props
        const sentAt = utilService.getDatePreview(email.sentAt)
        return < tr className="email-preview" >
            <td>
                <Link to={`/mail/details/${email.id}`}>⭐️</Link>
            </td>
            <td colSpan="2">
                <Link to={`/mail/details/${email.id}`}>{email.to}</Link>
            </td>
            <td colSpan="4">
                <Link to={`/mail/details/${email.id}`}>{email.body}</Link>
            </td>
            <td>
                <Link to={`/mail/details/${email.id}`}>{sentAt}</Link>
            </td>
        </tr >
    }
}