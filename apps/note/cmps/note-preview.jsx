
export function NotePreview({ note }) {

    function DynamicCmp() {
        switch (note.type) {
            case ('note-txt'):
                return TxtNote(note)
        }
    }
    return (
        <DynamicCmp />
    )

}

function TxtNote({ info: { title, txt } }) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{txt}</p>
        </div>
    )
}


