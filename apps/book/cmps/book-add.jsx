import { bookService } from "../services/book.service.js"

export class BookAdd extends React.Component {

    state = {
        search: '',
        booksToShow: null
    }

    onSearch = (ev) => {
        ev.preventDefault()
        const { search } = this.state
        bookService.getGoogleBooks(search)
            .then(books => {
                this.setState({ booksToShow: books })
            })
    }

    handleChange = ({ target }) => {
        const val = target.value
        this.setState(({ search: val }))
    }

    onAddGoogleBook = (googleBook) => {
        const {onAddBook} = this.props
        bookService.addGoogleBook(googleBook)
        onAddBook(googleBook)
    }

    render() {
        const { onSearch, handleChange, onAddGoogleBook } = this
        const { search, booksToShow } = this.state

        return <section className="book-add">
            <form onSubmit={onSearch}>
                <label htmlFor="search">Add new book</label>
                <input
                    className="input-search"
                    type="search"
                    id="search"
                    placeholder="Search for book"
                    value={search}
                    onChange={handleChange}
                />
                <button onClick={onSearch} className="btn btn-search">Search</button>
            </form>
            {booksToShow && <ul className="book-list">
                {booksToShow.map(book =>
                    <li key={book.id}>{book.title}<button onClick={() => onAddGoogleBook(book)}>+</button></li>
                )}
            </ul>}
        </section>
    }
}