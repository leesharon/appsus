

export class Rate extends React.Component {

    state = {
        rating: 1,
        hover: null
    }

    setRating = (idx) => {
        const {setRate} = this.props
        this.setState({ rating: idx }, setRate(idx))
    }

    setHover = (idx) => {
        this.setState({hover: idx})
    }

    render() {
        const { rating, hover } = this.state

        return <div className="star-rating">
            <span>Rate: </span>
            {[...Array(5)].map((star, idx) => {
                idx++
                return (
                    <button
                        type="button"
                        key={idx}
                        className={idx <= (hover || rating) ? "btn-rate on" : "btn-rate off"}
                        onClick={() => this.setRating(idx)}
                        onMouseEnter={() => this.setHover(idx)}
                        onMouseLeave={() => this.setHover(null)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    }
}