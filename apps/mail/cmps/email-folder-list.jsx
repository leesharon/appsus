
const { NavLink } = ReactRouterDOM

export function EmailFolderList() {

    return <ul className="folder-list">
        <li>
            <NavLink to="/mail/inbox">
                <i className="fa-solid fa-inbox"></i>
                Inbox
            </NavLink>
        </li>
        <li>
            <NavLink to="/mail/starred">
                <i className="fa-solid fa-star"></i>
                Starred
            </NavLink>
        </li>
        <li>
            <NavLink to="/mail/sent">
                <i className="fa-solid fa-paper-plane"></i>
                Sent
            </NavLink>
        </li>
        <li>
            <NavLink to="/mail/read">
                <i className="fa-solid fa-envelope-open"></i>
                Read
            </NavLink>
        </li>
        <li>
            <NavLink to="/mail/unread">
                <i className="fa-solid fa-envelope"></i>
                Unread
            </NavLink>
        </li>
        <li>
            <NavLink to="/mail/drafts">
                <i className="fa-brands fa-firstdraft"></i>
                Drafts
            </NavLink>
        </li>
        <li>
            <NavLink to="/mail/trash">
                <i className="fa-solid fa-trash-can"></i>
                Trash
            </NavLink>
        </li>
    </ul>
}