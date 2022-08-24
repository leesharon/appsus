import { EmailFilter } from "../cmps/email-filter.jsx";
import { EmailFolderList } from "../cmps/email-folder-list.jsx";
import { EmailList } from "../cmps/email-list.jsx";
import { emailService } from "../services/email.service.js";

export class EmailApp extends React.Component {

    state = {
        emails: [],
        filterBy: null,
        loggedInUser: null
    }

    componentDidMount() {
        this.loadEmails()
        this.loadUser()
    }

    componentDidUpdate(prevProps) {
        console.log('prevProps.match.params: ', this.props.match.params)
        // if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
        //     this.loadBook()
        // }
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

    render() {
        const { emails } = this.state

        if (!emails) return <h1>Loading...</h1>
        return <section className="email-app">
            <EmailFilter />
            <div className="main-content">
                <EmailFolderList />
                <EmailList emails={emails} />
            </div>
        </section >
    }
}