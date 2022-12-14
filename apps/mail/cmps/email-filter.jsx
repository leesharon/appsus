import { eventBusService } from "../../../services/event-bus.service.js"

export class EmailFilter extends React.Component {
    state = {
        search: ''
    }

    handleChange = ({ target }) => {
        const val = target.value
        this.setState({ search: val }, () => {
            this.props.onSetSearchFilter(this.state.search)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetSearchFilter(this.state.search)
    }

    toggleSideBar = () => {
        eventBusService.emit('side-bar-open')
    }

    render() {
        const { search } = this.state
        const { onFilter, handleChange } = this

        return <section className="email-filter">
            <form onSubmit={onFilter}>
                <button className="btn-side-bar" onClick={this.toggleSideBar}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <button className="btn btn-search"><i className="fa-solid fa-magnifying-glass"></i></button>
                <input
                    type="search"
                    placeholder="Search email"
                    className="input-search"
                    value={search}
                    onChange={handleChange}
                />
            </form>
        </section>
    }
}