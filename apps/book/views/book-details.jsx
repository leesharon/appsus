import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { BookReview } from "../cmps/book-review.jsx"
import { LongTxt } from "../cmps/long-txt.jsx"
const { Link } = ReactRouterDOM

export class BookDetails extends React.Component {

    state = {
        book: null
    }

    componentDidMount() {
            this.loadBook()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    loadBook = () => {
        const { bookId } = this.props.match.params
        bookService.getById(bookId)
            .then(book => {
                if (!book) return this.onGoBack()
                this.setState({ book })
            })
    }

    getPageCountTxt(pageCount) {
        let txt = `Page Count: ${pageCount} `
        if (pageCount > 500) txt += '(Long Reading)'
        else if (pageCount > 200) txt += '(Decent Reading)'
        else if (pageCount < 100) txt += '(Light Reading)'
        return txt
    }

    getPublishedDateTxt(publishedYear) {
        let txt = `Published Date: ${publishedYear} `
        const currYear = utilService.getCurrYear()
        if ((currYear - publishedYear) > 10) txt += '- Veteran Book'
        if ((currYear - publishedYear) < 1) txt += '- New!'
        return txt
    }

    getPriceColor(bookPrice) {
        if (bookPrice > 150) return 'red'
        else if (bookPrice < 20) return 'green'
    }

    getLanguageTxt(lang) {
        let langTxt
        switch (lang) {
            case 'he':
                langTxt = 'Hebrew'
                break;

            case 'en':
                langTxt = 'English'
                break;

            case 'sp':
                langTxt = 'Spanish'
                break;
        }
        return langTxt
    }

    onRemoveBook = (bookId) => {
        bookService.remove(bookId)
            .then(() => {
                this.onGoBack()
            })
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

    onGoBack = () => {
        this.props.history.push('/book')
    }

    onNextBook = (bookId) => {

    }

    render() {
        const { book } = this.state
        if (!book) return <h1>Loading...</h1>

        const { listPrice,
            id,
            pageCount,
            publishedDate,
            language,
            subtitle,
            title,
            authors,
            categories,
            description,
            thumbnail
        } = book
        const priceTxt = this.getPriceTxt(listPrice.currencyCode, listPrice.amount)
        const pageCountTxt = this.getPageCountTxt(pageCount)
        const publishTxt = this.getPublishedDateTxt(publishedDate)
        const priceColor = this.getPriceColor(listPrice.amount)
        const langTxt = this.getLanguageTxt(language)
        const nextBookId = bookService.getNextBookId(id)

        return <section className="book-details full main-layout">
            <div className="book-container">
                <div className="img-container">
                    <img src={thumbnail} />
                </div>
                <div className="book-info">
                    <h2>Book Details:</h2>
                    <h3>Title: {title}</h3>
                    <h3>Subtitle: {subtitle}</h3>
                    <h3>Authors: {authors.join(', ')}</h3>
                    <h3 className={priceColor}>Price: {priceTxt}
                        {listPrice.isOnSale && <img src="../assets/img/on-sale.png" />}
                    </h3>
                    <h3>{publishTxt}</h3>
                    <h3>{pageCountTxt}</h3>
                    <h3>Categories: {categories.join(', ')}</h3>
                    <h3>Language: {langTxt}</h3>
                    <LongTxt txt={description} />
                </div>
            </div>
            <button className="btn btn-back" onClick={this.onGoBack}>Go Back</button>
            <button className="btn btn-remove" onClick={() => this.onRemoveBook(id)}>Remove Book</button>
            <Link to={`/book/${nextBookId}`}><button className="btn btn-next">Next Book</button></Link>
            <BookReview loadBook={this.loadBook} reviews={book.reviews} bookId={book.id} />
        </section>
    }

}