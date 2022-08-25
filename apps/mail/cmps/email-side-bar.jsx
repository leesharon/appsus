import { EmailFolderList } from "./email-folder-list.jsx";

export function EmailSideBar({ toggleModal }) {
    
    return <div className="email-side-bar">
        <div onClick={toggleModal} className="compose">
            <i className="fa-solid fa-pencil"></i>&nbsp;
            Compose
        </div>
        <EmailFolderList />
    </div>
}