import { EmailPreview } from "./email-preview.jsx";

export function EmailList({ emails }) {

    return <section className="email-list">
        <table>
            <tbody>
                {emails.map(email => <EmailPreview
                    key={email.id}
                    email={email}
                />)}
            </tbody>
        </table>
    </section>
}