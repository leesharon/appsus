
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
        isModalOpened: false,
        sortBy: {
            isDateDesc: 1,
            isSubjDesc: 1
        }
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

    onSetSortBy = (sortBy) => {
        const {emails} = this.state
        const { isSubjDesc, isDateDesc} = this.state.sortBy
        if (sortBy === 'subject') {
            emails.sort((a, b) => a.subject.toLowerCase().localeCompare(b.subject.toLowerCase()) * isSubjDesc)
            this.setState(({sortBy}) => ({ emails, sortBy: {
                ...sortBy,
                isSubjDesc: sortBy.isSubjDesc * -1
            } }))
            

        } else if (sortBy === 'date') {
            emails.sort((a, b) => (a - b) * isDateDesc )
            this.setState(({sortBy}) => ({ emails, sortBy: {
                ...sortBy,
                isSubjDesc: sortBy.isDateDesc * -1
            } }))
        }
    }

    composeEmail = ({ to, subject, body }) => {
        emailService.add(to, subject, body)
            .then((email) => {
                if (this.state.filterBy.folder === 'sent') {
                    const {emails} = this.state
                    emails.unshift(email)
                    this.setState({ emails })
                }
            })
    }

    toggleModal = () => {
        const { isModalOpened } = this.state
        this.setState({ isModalOpened: !isModalOpened })
    }

    setStar = (emailId) => {
        emailService.setEmailStatus(emailId, 'starred')
            .then(() => {
                const { emails } = this.state
                const emailIdx = emails.findIndex(email => email.id === emailId)
                emails[emailIdx].status = (emails[emailIdx].status === 'starred') ? null : 'starred'
            })
    }

    onToggleIsRead = (emailId, isRead) => {
        emailService.toggleIsRead(emailId, isRead)
            .then(() => {
                let {emails} = this.state
                const emailIdx = emails.findIndex(email => email.id === emailId)
                emails[emailIdx].isRead = true
                this.setState({ emails })
            })
    }

    render() {
        const { emails, loggedInUser, isModalOpened } = this.state
        const { onToggleIsRead,
            onSetSortBy,
            onSetSearchFilter,
            toggleModal,
            onRemoveEmail,
            setStar,
            composeEmail
        } = this

        if (!emails) return <h1>Loading...</h1>
        return <section className="full email-index">
            <EmailFilter onSetSearchFilter={onSetSearchFilter} />
            <div className="main-content">
                <EmailSideBar toggleModal={toggleModal} />
                <EmailList
                    loggedInUser={loggedInUser}
                    onRemoveEmail={onRemoveEmail}
                    emails={emails}
                    setStar={setStar}
                    onToggleIsRead={onToggleIsRead}
                    onSetSortBy={onSetSortBy}
                />
            </div>
            <ModalCompose
                composeEmail={composeEmail}
                isModalOpened={isModalOpened}
                toggleModal={toggleModal}
            />
        </section >
    }
}