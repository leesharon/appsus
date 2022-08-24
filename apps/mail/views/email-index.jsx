
import { EmailFilter } from "../cmps/email-filter.jsx"
import { EmailFolderList } from "../cmps/email-folder-list.jsx"
import { EmailList } from "../cmps/email-list.jsx"
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
                <EmailFolderList />
                <EmailList emails={emails} />
            </div>
        </section >
    }
}