import { utilService } from "../../../services/util.service.js";
import { EmailDetails } from "../views/email-details.jsx";

export class EmailPreview extends React.Component {

    state = {
        isShown: false
    }

    onShowEmail = () => {
        this.setState(({ isShown }) => ({ isShown: !isShown }))
    }

    render() {
        const { email, onRemoveEmail } = this.props
        const { isShown } = this.state
        const sentAt = utilService.getDatePreview(email.sentAt, true)
        const shortEmailBody = utilService.trimString(email.body)
        return <React.Fragment>
            < tr onClick={this.onShowEmail} className="email-preview" >
                <td>⭐️</td>
                <td colSpan="2">{email.to}</td>
                <td colSpan="10">{shortEmailBody}</td>
                <td>{sentAt}</td>
            </tr >
            {isShown && <EmailDetails onRemoveEmail={onRemoveEmail} email={email}/>}
        </React.Fragment>
    }
}