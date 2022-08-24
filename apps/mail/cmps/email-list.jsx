import { EmailPreview } from "./email-preview.jsx";

export function EmailList({ emails, onRemoveEmail }) {

    return <section className="email-list">
        <table>
            <tbody>
                {emails.map(email => <EmailPreview
                    key={email.id}
                    email={email}
                    onRemoveEmail={onRemoveEmail}
                />)}
            </tbody>
        </table>
    </section>
}