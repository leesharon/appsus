const { Link, NavLink, withRouter } = ReactRouterDOM
export function AppHeader() {

    return <header className="full main-layout app-header">
        <Link className="main-logo" to="/">
            <img src="../assets/img/horse-hopper.png" alt="" />
            <h3>AppSus</h3>
        </Link>
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/note">Keep</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/book">Books</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    </header>
}
