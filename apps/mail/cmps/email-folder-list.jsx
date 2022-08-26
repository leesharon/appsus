const { NavLink } = ReactRouterDOM

export function EmailFolderList({ toggleSideBar }) {

    return <ul className={`folder-list`}>
        <li className="side-logo">
            <h3 className="icon icon-horse-hopper">AppSus</h3>
        </li>
        <li onClick={() => {toggleSideBar(true)}}>
            <NavLink to="/mail/inbox">
                <i className="fa-solid fa-inbox"></i>
                Inbox
            </NavLink>
        </li>
        <li onClick={() => {toggleSideBar(true)}}>
            <NavLink to="/mail/starred">
                <i className="fa-solid fa-star"></i>
                Starred
            </NavLink>
        </li>
        <li onClick={() => {toggleSideBar(true)}}>
            <NavLink to="/mail/sent">
                <i className="fa-solid fa-paper-plane"></i>
                Sent
            </NavLink>
        </li>
        <li onClick={() => {toggleSideBar(true)}}>
            <NavLink to="/mail/read">
                <i className="fa-solid fa-envelope-open"></i>
                Read
            </NavLink>
        </li>
        <li onClick={() => {toggleSideBar(true)}}>
            <NavLink to="/mail/unread">
                <i className="fa-solid fa-envelope"></i>
                Unread
            </NavLink>
        </li>
        <li onClick={() => {toggleSideBar(true)}}>
            <NavLink to="/mail/drafts">
                <i className="fa-brands fa-firstdraft"></i>
                Drafts
            </NavLink>
        </li>
        <li onClick={() => {toggleSideBar(true)}}>
            <NavLink to="/mail/trash">
                <i className="fa-solid fa-trash-can"></i>
                Trash
            </NavLink>
        </li>
    </ul>
}