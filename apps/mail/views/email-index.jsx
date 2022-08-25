
import { EmailFilter } from "../cmps/email-filter.jsx"
import { EmailList } from "../cmps/email-list.jsx"
import { EmailSideBar } from "../cmps/email-side-bar.jsx"
import { ModalCompose } from "../cmps/modal-compose.jsx"
import { emailService } from "../services/email.service.js"

export class EmailIndex extends React.Component {

    state = {
        emails: [],
        loggedInUser: null,
        filterBy: {
            folder: 'inbox'
        },
        isModalOpened: false
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

    composeEmail = ({ to, subject, body }) => {
        emailService.add(to, subject, body)
            .then(emails => this.setState({ emails }))
    }

    toggleModal = () => {
        const { isModalOpened } = this.state
        this.setState({ isModalOpened: !isModalOpened })
    }

    setStar = (emailId) => {
        emailService.setEmailStatus(emailId, 'starred')
            .then(() => {
                const {emails} = this.state
                const emailIdx = emails.findIndex(email => email.id === emailId)
                emails[emailIdx].status = (emails[emailIdx].status === 'starred') ? null : 'starred'
            })
    }

    render() {
        const { emails, loggedInUser, isModalOpened } = this.state

        if (!emails) return <h1>Loading...</h1>
        return <section className="full email-index">
            <EmailFilter onSetSearchFilter={this.onSetSearchFilter} />
            <div className="main-content">
                <EmailSideBar toggleModal={this.toggleModal} />
                <EmailList
                    loggedInUser={loggedInUser}
                    onRemoveEmail={this.onRemoveEmail}
                    emails={emails}
                    setStar={this.setStar}
                />
            </div>
            <ModalCompose
                composeEmail={this.composeEmail}
                isModalOpened={isModalOpened}
                toggleModal={this.toggleModal}
            />
        </section >
    }
}