import { utilService } from "../../../services/util.service.js"
import { emailService } from "../services/email.service.js"

export class EmailDetails extends React.Component {

    state = {
        email: null
    }

    componentDidMount() {
        this.loadEmail()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.emailId !== this.props.match.params.emailId) {
            this.loadEmail()
        }
    }

    loadEmail = () => {
        const { emailId } = this.props.match.params
        emailService.getById(emailId)
            .then(email => {
                if (!email) return this.onGoBack()
                this.setState({ email })
            })
    }

    onGoBack = () => {
        this.props.history.push('/mail')
    }

    render() {
        const {email} = this.state
        if (!email) return <h1>Loading...</h1>
        const sentAt = utilService.getDatePreview(email.sentAt)

        console.log('email: ', email)
        return <section className="email-details">
            <h2>{email.subject}</h2>
            <h3>from: {email.from}, {sentAt}</h3>
            <p>{email.body}</p>
            <button className="btn btn-respond">Respond</button>
            <button className="btn btn-forward">Forward</button>
        </section>
    }
}