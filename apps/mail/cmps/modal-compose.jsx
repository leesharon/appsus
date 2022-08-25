
export class ModalCompose extends React.Component {
    state = {
        compose: {
            to: '',
            subject: '',
            body: ''
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({
            compose: {
                ...prevState.compose,
                [field]: value
            }
        }))
    }

    onComposeEmail = (ev) => {
        ev.preventDefault()
        this.props.toggleModal()
        this.props.composeEmail(this.state.compose)
    }

    render() {
        const {onComposeEmail} = this
        const {isModalOpened, toggleModal} = this.props
        const { to, subject, body } = this.state.compose
        const modalClass = isModalOpened ? 'modal-opened' : '' 

        return <div className={`modal-compose ${modalClass}`}>
            <div className="modal-header">
                <h3>New Message</h3>
                <button onClick={toggleModal} className="btn-close">X</button>
            </div>
            <form>
                <input
                    autoFocus
                    type="text"
                    placeholder="To"
                    name="to"
                    value={to}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    value={subject}
                    onChange={this.handleChange}
                />
                <input
                    type="textarea"
                    placeholder=""
                    name="body"
                    rows="10" 
                    cols="2"
                    value={body}
                    onChange={this.handleChange}
                />
                <button onClick={onComposeEmail} className="btn btn-send">Send</button>
            </form>
        </div>
    }
}