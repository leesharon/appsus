import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { EmailIndex } from "./apps/mail/views/email-index.jsx"
import { eventBusService } from "./services/event-bus.service.js"
import { noteService } from "./apps/note/services/note.service.js"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {

    eventBusService.on('mail-to-note', (mail) => {
        noteService.createNote('txt', mail)
    })

    console.log('window: ', window)
    
    return <Router>
        <section className="app main-layout">
            <AppHeader />
            <Switch>
                <Route path="/mail/compose/:noteId" component={EmailIndex} />
                <Route path="/mail/:folder?" component={EmailIndex} />
                <Route path="/note" component={NoteIndex} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router> 
}
