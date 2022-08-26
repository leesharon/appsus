import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { EmailIndex } from "./apps/mail/views/email-index.jsx"
import { eventBusService } from "./services/event-bus.service.js"
import { noteService } from "./apps/note/services/note.service.js"
import { BookIndex } from "./apps/book/views/book-index.jsx"
import { BookDetails } from "./apps/book/views/book-details.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {

    eventBusService.on('mail-to-note', (mail) => {
        noteService.createNote('txt', mail)
    })

    eventBusService.on('note-to-email', (noteId) => {
        const currUrl = window.location.href
        const destinationUrl = currUrl.substring(0, currUrl.length - 4) + 'mail/compose/' + noteId
        window.location.href = destinationUrl

    })

    return <Router>
        <section className="app main-layout">
            <AppHeader />
            <Switch>
                <Route path="/mail/compose/:noteId" component={EmailIndex} />
                <Route path="/mail/:folder?" component={EmailIndex} />
                <Route path="/note" component={NoteIndex} />
                <Route path="/book/:bookId" component={BookDetails} />
                <Route path="/book" component={BookIndex} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}
