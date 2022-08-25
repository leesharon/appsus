import { EmailPreview } from "./email-preview.jsx";

export function EmailList({ emails, onRemoveEmail, loggedInUser, setStar, onToggleIsRead, onSetSortBy }) {

    return <section className="email-list">
        <table>
            <tbody>
            <tr>
                <td colSpan={12}>From</td>
                <td onClick={() => onSetSortBy('subject')}>Subject</td>
                <td onClick={() => onSetSortBy('date')}>Date</td>
            </tr>
                {emails.map(email => <EmailPreview
                    key={email.id}
                    email={email}
                    onRemoveEmail={onRemoveEmail}
                    loggedInUser={loggedInUser}
                    setStar={setStar}
                    onToggleIsRead={onToggleIsRead}
                />)}
            </tbody>
        </table>
    </section>
}