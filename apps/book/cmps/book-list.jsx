import { BookPreview } from "./book-preview.jsx"

export function BookList({ getPriceTxt ,onSelectBook, books }) {

    return <section className="book-list">
        {books.map( book => <BookPreview 
            key={book.id}
            book={book}
            getPriceTxt={getPriceTxt} />)}
    </section>
}