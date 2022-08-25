import { utilService } from "../../../services/util.service.js";
import { EmailDetails } from "../views/email-details.jsx";
import { Rate } from "./rate.jsx";

export class EmailPreview extends React.Component {

    state = {
        isShown: false
    }

    onShowEmail = (emailId) => {
        this.setState(({ isShown }) => ({ isShown: !isShown }))
        this.props.onToggleIsRead(emailId, true)
    }

    stopPropagation = (ev) => {
        ev.stopPropagation()
    }

    render() {
        const { email, onRemoveEmail, loggedInUser, setStar } = this.props
        const { isShown } = this.state
        const fontColor = email.isRead ? '' : 'unread'
        const sentAt = utilService.getDatePreview(email.sentAt, true)
        const shortEmailBody = utilService.trimString(email.body)

        return <React.Fragment>
            < tr onClick={() => {this.onShowEmail(email.id)}} className="email-preview" >
                <td onClick={this.stopPropagation}><Rate setStar={setStar} email={email} /></td>
                <td className={fontColor} colSpan="2">{email.to}</td>
                <td className={fontColor} colSpan="10">{shortEmailBody}</td>
                <td className={fontColor}>{sentAt}</td>
            </tr >
            {isShown && <EmailDetails onRemoveEmail={onRemoveEmail} email={email} />}
        </React.Fragment>
    }
}