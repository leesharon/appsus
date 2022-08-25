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
            <Link className="main-logo" to="/">
                <i className="icon icon-horse-hopper"></i>
                <h3>AppSus</h3>
            </Link>
            <nav className={modalClass}>
                <NavLink className="nav-link" onClick={this.onToggleModal} exact to="/">
                    <img src="../assets/img/home-3.svg" alt="" />
                    <span>Home</span>
                </NavLink>
                <NavLink className="nav-link" onClick={this.onToggleModal} to="/note">
                    <img src="../assets/img/d-edit.svg" alt="" />
                    <span>Keep</span>
                </NavLink>
                <NavLink className="nav-link" onClick={this.onToggleModal} to="/mail/inbox">
                    <img src="../assets/img/newsletter.svg" alt="" />
                    <span>Mail</span>
                </NavLink>
                <NavLink className="nav-link" onClick={this.onToggleModal} to="/book">
                    <img src="../assets/img/books-46.svg" alt="" />
                    <span>Books</span>
                </NavLink>
                <NavLink className="nav-link about" onClick={this.onToggleModal} to="/about">
                    <img src="../assets/img/question-mark.svg" alt="" />
                    <span>About</span>
                </NavLink>
            </nav>
            <button className="btn btn-menu" onClick={this.onToggleModal}>
                <i className="icon icon-grid-view"></i>
            </button>
        </header>
    }
}
