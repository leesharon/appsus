
import { eventBusService } from "../../../services/event-bus.service.js"
import { noteService } from "../../note/services/note.service.js"
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
        },
        savedNote: null,
        isFolderListOpened: false
    }

    audioSent = new Audio('../../../assets/sound/sent.wav')

    componentDidMount() {
        const { folder, noteId } = this.props.match.params
        const { loadEmails, loadUser, toggleSideBar, getNote} = this

        if (noteId) getNote(noteId)
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                folder
            }
        }), () => loadEmails())
        loadUser()

        // add listener for sidebar open
        eventBusService.on('side-bar-open', () => {
            toggleSideBar()
        })
    }

    getNote = (noteId) => {
        noteService.getById(noteId)
            .then((note) => { this.setState({ savedNote: note }) })
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
                console.log('removed')
                const emails = this.state.emails.filter(email => email.id !== emailId)
                this.setState({ emails })
            })
            .catch(err => {
                console.log('problem', err)
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
        const { emails } = this.state
        const { isSubjDesc, isDateDesc } = this.state.sortBy
        if (sortBy === 'subject') {
            emails.sort((a, b) => a.subject.toLowerCase().localeCompare(b.subject.toLowerCase()) * isSubjDesc)
            this.setState(({ sortBy }) => ({
                emails, sortBy: {
                    ...sortBy,
                    isSubjDesc: sortBy.isSubjDesc * -1
                }
            }))

        } else if (sortBy === 'date') {
            emails.sort((a, b) => (a - b) * isDateDesc)
            this.setState(({ sortBy }) => ({
                emails, sortBy: {
                    ...sortBy,
                    isSubjDesc: sortBy.isDateDesc * -1
                }
            }))
        }
    }

    composeEmail = ({ to, subject, body }) => {
        emailService.add(to, subject, body)
            .then((email) => {
                this.audioSent.play()
                if (this.state.filterBy.folder === 'sent') {
                    const { emails } = this.state
                    emails.unshift(email)
                    this.setState({ emails })
                }
            })
    }

    toggleModal = () => {
        const { isModalOpened } = this.state
        this.setState({ isModalOpened: !isModalOpened })
    }

    toggleSideBar = (isMenuItem) => {
        const {isFolderListOpened} = this.state
        if (isMenuItem && !isFolderListOpened) return
        this.setState(({isFolderListOpened}) => ({ isFolderListOpened: !isFolderListOpened }))
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
                let { emails } = this.state
                const emailIdx = emails.findIndex(email => email.id === emailId)
                emails[emailIdx].isRead = true
                this.setState({ emails })
            })
    }

    render() {
        const { emails, loggedInUser, isModalOpened, savedNote, isFolderListOpened } = this.state
        if (!emails) return <h1>Loading...</h1>

        const { onToggleIsRead,
            toggleSideBar,
            onSetSortBy,
            onSetSearchFilter,
            toggleModal,
            onRemoveEmail,
            setStar,
            composeEmail
        } = this
        const isListOpenedClass = isFolderListOpened ? 'opened' : ''


        return <section className={`full email-index ${isListOpenedClass}`}>
            <div className="main-screen" onClick={toggleSideBar}></div>
            <EmailFilter onSetSearchFilter={onSetSearchFilter} />
            <div className="main-content">
                <EmailSideBar toggleModal={toggleModal} toggleSideBar={toggleSideBar}/>
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
                savedNote={savedNote}
                composeEmail={composeEmail}
                isModalOpened={isModalOpened}
                toggleModal={toggleModal}
            />
        </section >
    }
}