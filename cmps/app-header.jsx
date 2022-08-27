const { Link, NavLink } = ReactRouterDOM
export class AppHeader extends React.Component {
    state = {
        isModalShown: false
    }

    onToggleModal = () => {
        this.setState({ isModalShown: !this.state.isModalShown })
    }

    render() {
        const modalClass = (this.state.isModalShown) ? 'show' : 'hide'

        return <header className="full main-layout app-header">
            <div className="main-header-layout">
                <Link className="main-logo" to="/">
                    <i className="icon icon-horse-hopper"></i>
                    <h3>AppSus</h3>
                </Link>
                <nav className={`${modalClass} animate__animated animate__fadeInTopRight `}>
                    <NavLink className="nav-link" onClick={this.onToggleModal} exact to="/">
                        <i className="fa-solid fa-house-chimney"></i>
                        <span>Home</span>
                    </NavLink>
                    <NavLink className="nav-link" onClick={this.onToggleModal} to="/note">
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span>Keep</span>
                    </NavLink>
                    <NavLink className="nav-link" onClick={this.onToggleModal} to="/mail/inbox">
                        <i className="fa-solid fa-envelope"></i>
                        <span>Mail</span>
                    </NavLink>
                    <NavLink className="nav-link" onClick={this.onToggleModal} to="/book">
                        <i className="fa-solid fa-book"></i>
                        <span>Books</span>
                    </NavLink>
                    <NavLink className="nav-link about" onClick={this.onToggleModal} to="/about">
                        <i className="fa-solid fa-question"></i>
                        <span>About</span>
                    </NavLink>
                </nav>
                <button className="btn btn-menu" onClick={this.onToggleModal}>
                    <i className="icon icon-grid-view"></i>
                </button>
            </div >
        </header>
    }
}
