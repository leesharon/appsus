const { Link, NavLink } = ReactRouterDOM
export function AppHeader() {

    function toggleMenu() {

    }

    return <header className="full main-layout app-header">
        <Link className="main-logo" to="/">
            <i className="icon icon-horse-hopper"></i>
            <h3>AppSus</h3>
        </Link>
        <nav>
            <NavLink exact to="/">
                <img src="../assets/img/home-3.svg" alt="" />
                <span>Home</span>
            </NavLink>
            <NavLink to="/note">
                <img src="../assets/img/d-edit.svg" alt="" />
                <span>Keep</span>
            </NavLink>
            <NavLink to="/mail">
                <img src="../assets/img/newsletter.svg" alt="" />
                <span>Mail</span>
            </NavLink>
            <NavLink to="/book">
                <img src="../assets/img/books-46.svg" alt="" />
                <span>Books</span>
            </NavLink>
            <NavLink to="/about">
                <img src="../assets/img/question-mark.svg" alt="" />
                <span>About</span>
            </NavLink>
            <NavLink>
                <img src="../assets/img/books-46.svg" /></NavLink>
        </nav>
        <i className="icon icon-grid-view"></i>
    </header>
}
