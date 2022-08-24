import { EmailFilter } from "../cmps/email-filter.jsx";
import { EmailFolderList } from "../cmps/email-folder-list.jsx";
import { EmailList } from "../cmps/email-list.jsx";

export function EmailApp() {

    return <section className="email-app">
        <h1>EmailApp</h1>
        <EmailFilter />
        <EmailList />
        <EmailFolderList />
    </section>
}