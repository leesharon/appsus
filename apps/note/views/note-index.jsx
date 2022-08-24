import { NoteCompose } from "../cmps/note-compose.jsx";
import { NoteList } from "../cmps/note-list.jsx";

export class NoteIndex extends React.Component {
    render() {
        return (
            <main>
                <NoteCompose />
                <NoteList />
            </main>

        )
    }
}
