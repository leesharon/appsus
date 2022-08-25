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
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/note">Keep</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/book">Books</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink><img src="../assets/img/books-46.svg" /></NavLink>
            </nav>
            <button onClick={this.onToggleModal}>
                <i className="icon icon-grid-view"></i>
            </button>
        </header>
    }
}
