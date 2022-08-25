import { EmailPreview } from "./email-preview.jsx";

export function EmailList({ emails, onRemoveEmail, loggedInUser, setStar, onToggleIsRead }) {

    return <section className="email-list">
        <table>
            <tbody>
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