export class NoteSearch extends React.Component {

    state = {
        searchBy: ''
    }

    onHandleChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value })
    }
    onClearState = () => {
        this.setState({ searchBy: '' })
    }

    render() {
        const { searchBy } = this.state
        const { onHandleChange, onClearState } = this
        const { onSearchNotes } = this.props
        return (
            <div className="search-container">
                <button className="search-btn" onClick={() => { onSearchNotes(searchBy) }}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button >
                <input
                    value={searchBy}
                    onChange={onHandleChange}
                    name="searchBy"
                    type="text"
                    placeholder="Search" />
                {searchBy && <button className="clear-search-btn" onClick={() => {
                    onClearState()
                    onSearchNotes('')
                }}>
                    <i className="fa-solid fa-xmark"></i>
                </button>}
            </div>
        )
    }
}