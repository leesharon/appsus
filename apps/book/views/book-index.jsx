import { BookFilter } from "../cmps/book-filter.jsx"
import { BookList } from "../cmps/book-list.jsx"
import { bookService } from "../services/book.service.js"
// import { BookAdd } from "../cmps/book-add.jsx"

export class BookIndex extends React.Component {

    state = {
        books: [],
        filterBy: null,
        selectedBook: null
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then(books => {
                this.setState({ books })
            })
    }

    onAddBook = (book) => {
        this.setState( prevState => ({ books: [book, ...prevState.books] }), () => {
        })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    getPriceTxt = (currencyCode, amount) => {
        let priceTxt
        switch (currencyCode) {
            case 'EUR':
                priceTxt = amount + '€'
                break;
            case 'ILS':
                priceTxt = '₪' + amount
                break;
            case 'USD':
                priceTxt = '$' + amount
                break;
        }
        return priceTxt
    }

    render() {
        const { books, selectedBook } = this.state

        {if(!books) return <h1>Loading...</h1>}

        return <section className="book-index full main-layout">
            {!selectedBook && <React.Fragment>
                <BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
                <BookList getPriceTxt={this.getPriceTxt}
                    books={books} />
            </React.Fragment>}
        </section>
    }
}