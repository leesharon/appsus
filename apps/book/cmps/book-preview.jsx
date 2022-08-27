const { Link } = ReactRouterDOM


export class BookPreview extends React.Component {

    render() {
        const { book, getPriceTxt } = this.props
        const priceTxt = getPriceTxt(book.listPrice.currencyCode, book.listPrice.amount)

        return <Link to={`/book/${book.id}`} className="preview-link">
            <article className="book-preview">
                <h3>Title: {book.title}</h3>
                <h3>Price: {priceTxt}</h3>
                <div className="img-container">
                    <img src={book.thumbnail} alt="" />
                </div>
            </article>
        </Link>
    }

}