import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { Rate } from "./rate.jsx"


export class BookReview extends React.Component {

    state = {
        review: {
            fullName: '',
            rate: 1,
            readAt: utilService.getCurrFullDate(),
            txt: ''
        }
    }

    handleChange = ({ target }) => {
        const prop = target.name
        const val = target.type === 'select-one' ? +target.value : target.value

        this.setState((prevState) => ({
            review: {
                ...prevState.review,
                [prop]: val
            }
        }))
    }

    setRate = (num) => {
        this.setState((prevState) => ({
            review: {
                ...prevState.review,
                rate: num
            }
        }))
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { bookId, loadBook } = this.props
        bookService.createReview(this.state.review, bookId)
            .then(() => {
                this.setState({
                    review: {
                        fullName: '',
                        rate: 1,
                        readAt: utilService.getCurrFullDate(),
                        txt: ''
                    }
                }, loadBook())
            })
    }

    onRemoveReview = (reviewName) => {
        const { bookId, loadBook } = this.props
        bookService.removeReview(reviewName, bookId)
            .then(() => loadBook())
    }

    render() {
        const { reviews } = this.props
        const { fullName, rate, readAt, txt } = this.state.review
        const star = '⭐️'

        return <section className="reviews-container">
            <div className="review-submit">
                <h2>Write a Review!</h2>
                <form onSubmit={this.onSubmit}>

                    <div className="input-field">
                        <label htmlFor="full-name">Full Name: </label>
                        <input
                            autoFocus
                            type="text"
                            placeholder="Your name goes here"
                            id="full-name"
                            value={fullName}
                            name="fullName"
                            onChange={this.handleChange}
                        />
                    </div>

                    <Rate setRate={this.setRate}/>

                    <div className="input-field">
                        <label htmlFor="readAt">Read at: </label>
                        <input
                            type="date"
                            id="readAt"
                            value={readAt}
                            name="readAt"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="review-txt">Tell us your thoughts: </label>
                        <textarea
                            type="textarea"
                            placeholder="Your review goes here"
                            id="review-txt"
                            value={txt}
                            name="txt"
                            onChange={this.handleChange}
                        />
                    </div>

                    <button className="btn btn-review">Submit</button>
                </form>
            </div>
            {reviews && <section className="reviews">
                <h2>Top Reviews</h2>
                {reviews.map(review =>
                    <section key={review.fullName} className="review">
                        <h3>{review.fullName} / {review.readAt}</h3>
                        <h3>Rate: {star.repeat(review.rate)}</h3>
                        <p>"{review.txt}"</p>
                        <button className="btn btn-close" onClick={() => this.onRemoveReview(review.fullName)}>X</button>
                    </section>
                )}
            </section>}
        </section >
    }
}