import { EmailPreview } from "./email-preview.jsx";

export function EmailList({ emails, onRemoveEmail, loggedInUser, setStar }) {

    return <section className="email-list">
        <table>
            <tbody>
                {emails.map(email => <EmailPreview
                    key={email.id}
                    email={email}
                    onRemoveEmail={onRemoveEmail}
                    loggedInUser={loggedInUser}
                    setStar={setStar}
                />)}
            </tbody>
        </table>
    </section>
}