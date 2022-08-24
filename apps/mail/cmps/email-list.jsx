import { EmailPreview } from "./email-preview.jsx";

export function EmailList() {

    return <section className="email-list">
        <h1>EmailList</h1>
        <table>
            <tbody>
                <EmailPreview />
            </tbody>
        </table>
    </section>
}