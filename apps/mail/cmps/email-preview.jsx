import { utilService } from "../../../services/util.service.js";

export function EmailPreview({ email }) {

    return <tr className="email-preview">
        <td>⭐️</td>
        <td colSpan="2">{email.to}</td>
        <td colSpan={5}>{email.body}</td>
        <td>{utilService.getDatePreview(email.sentAt)}</td>
    </tr>
}