import { EmailFolderList } from "./email-folder-list.jsx";


export function EmailSideBar() {

    return <div className="email-side-bar">
        <div className="compose">
            <i class="fa-solid fa-pencil"></i>&nbsp;
            Compose
        </div>
        <EmailFolderList />
    </div>
}