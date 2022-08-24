
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

    render() {
        const {search} = this.state
        const {onFilter, handleChange} = this

        return <section className="email-filter">
            <form onSubmit={onFilter}>
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
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