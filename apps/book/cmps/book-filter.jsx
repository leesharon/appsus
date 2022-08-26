
export class BookFilter extends React.Component {
    state = {
        filterBy: {
            name: '',
            minPrice: 0,
            maxPrice: Infinity
        }
    }

    handleChange = ({ target }) => {
        const filterBy = target.name
        const val = target.type === 'range' ? +target.value : target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [filterBy]: val
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const { filterBy } = this.props
        const { name, minPrice, maxPrice } = this.state.filterBy

        return <section className="book-filter">
            <form onSubmit={this.onFilter}>
                <label htmlFor="by-name"></label>
                <input
                    className="input-search"
                    type="text"
                    id="by-name"
                    placeholder="Search for book"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                />

                <label htmlFor="by-min-price">Min Price: </label>
                <input
                    type="range"
                    id="by-min-price"
                    name="minPrice"
                    value={minPrice}
                    onChange={this.handleChange}
                    min="0"
                    max="150"
                />

                <label htmlFor="by-max-price">Max Price:</label>
                <input
                    type="range"
                    id="by-max-price"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={this.handleChange}
                    min="20"
                    max="200"
                />
            </form>
        </section>
    }
}
