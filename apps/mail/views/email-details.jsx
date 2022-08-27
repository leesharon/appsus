import { eventBusService } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"

export function EmailDetails({ email, onRemoveEmail }) {

    const sentAt = utilService.getDatePreview(email.sentAt)

    function onSaveNote(email) {
        eventBusService.emit('mail-to-note', { title: email.subject, txt: email.body })
    }

    return <React.Fragment>
        <tr className="email-details">
            <td colSpan={14}>
                <h2 className="email-heading">{email.subject}</h2><i onClick={() => { onRemoveEmail(email.id) }} className="remove-email fa-solid fa-trash-can"></i>
                <h4>from: {email.from} {sentAt}</h4>
                <p>{email.body}</p>
                <button className="btn btn-respond"><i className="fa-solid fa-reply"></i> Reply</button>
                <button className="btn btn-forward"><i className="fa-solid fa-share"></i> Forward</button>
                <button title="Save as note" className="btn-save-note" onClick={() => { onSaveNote(email) }}>
                    <i className="icon icon-d-edit"></i>
                </button>
            </td>
        </tr>
    </React.Fragment>
}