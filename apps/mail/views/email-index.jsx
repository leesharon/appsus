
import { EmailFilter } from "../cmps/email-filter.jsx"
import { EmailList } from "../cmps/email-list.jsx"
import { EmailSideBar } from "../cmps/email-side-bar.jsx"
import { emailService } from "../services/email.service.js"

export class EmailIndex extends React.Component {

    state = {
        emails: [],
        loggedInUser: null,
        filterBy: null
    }

    componentDidMount() {
        const { folder } = this.props.match.params
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                folder
            }
        }), () => this.loadEmails())
        this.loadUser()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.folder !== this.props.match.params.folder) {
            const { folder } = this.props.match.params
            this.setState((prevState) => ({
                filterBy: {
                    ...prevState.filterBy,
                    folder
                }
            }), () => this.loadEmails())
        }
    }

    loadUser = () => {
        emailService.getLoggedInUser()
            .then(loggedInUser => {
                this.setState({ loggedInUser })
            })
    }

    loadEmails = () => {
        emailService.query(this.state.filterBy)
            .then(emails => {
                this.setState({ emails })
            })
    }

    onRemoveEmail = (emailId) => {
        emailService.remove(emailId)
            .then(() => {
                console.log('Removed!')
                const emails = this.state.emails.filter(email => email.id !== emailId)
                this.setState({ emails })
                //! showSuccessMsg('Car removed')
            })
            .catch(err => {
                console.log('Problem!!', err)
            })
    }

    onSetSearchFilter = (search) => {
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                search
            }
        }), () => this.loadEmails())
    }

    render() {
        const { emails } = this.state

        if (!emails) return <h1>Loading...</h1>
        return <section className="full email-index">
            <EmailFilter onSetSearchFilter={this.onSetSearchFilter} />
            <div className="main-content">
                <EmailSideBar />
                <EmailList onRemoveEmail={this.onRemoveEmail} emails={emails} />
            </div>
        </section >
    }
}