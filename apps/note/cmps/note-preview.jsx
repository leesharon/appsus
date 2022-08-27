import { utilService } from "../../../services/util.service.js"
export function NotePreview({ note, onMarkDone }) {

    function DynamicCmp() {
        switch (note.type) {
            case ('note-txt'):
                return _TxtNote(note)
            case ('note-video'):
                return _VideoNote(note)
            case ('note-img'):
                return _ImgNote(note)
            case ('note-todos'):
                return _TodosNote(note, onMarkDone)
        }
    }
    return (
        <DynamicCmp />
    )

}

function _TxtNote({ info: { title, txt } }) {
    return (
        <React.Fragment>
            <h3>{title}</h3>
            <p>{txt}</p>
        </React.Fragment>
    )
}

function _VideoNote({ info: { title, videoLink } }) {
    return (
        <React.Fragment>
            <h3>{title}</h3>
            <iframe src={videoLink}>

            </iframe>
        </React.Fragment>
    )
}

function _ImgNote({ info: { title, imgUrl } }) {
    return (
        <React.Fragment>
            <h3>{title}</h3>
            <img src={imgUrl}>

            </img>
        </React.Fragment>
    )
}
function _TodosNote({ info: { title, todos } }) {
    console.log(todos)
    return (
        <React.Fragment>
            <h3>{title}</h3>
            <ul className="todo-list">
                {todos.map((todo, index) => {
                    return (
                        <li key={utilService.makeId()}>
                            <input
                                className="todo-check"
                                type="checkbox"
                                checked={(todo.doneAt) ? true : false}
                                id={`todo-${index}-${id}`}
                                onChange={() => { onMarkDone(id, index) }}
                            />
                            <label className="todo-txt" htmlFor={`todo-${index}-${id}`}>{todo.txt}</label>

                        </li>
                    )
                })}
            </ul>
        </React.Fragment >
    )
}
