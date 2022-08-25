import { utilService } from "../../../services/util.service.js"
export function NotePreview({ note }) {

    function DynamicCmp() {
        switch (note.type) {
            case ('note-txt'):
                return _TxtNote(note)
            case ('note-video'):
                return _VideoNote(note)
            case ('note-img'):
                return _ImgNote(note)
            case ('note-todos'):
                return _TodosNote(note)
        }
    }
    return (
        <DynamicCmp />
    )

}

function _TxtNote({ info: { title, txt } }) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{txt}</p>
        </div>
    )
}

function _VideoNote({ info: { title, videoLink } }) {
    return (
        <div>
            <h3>{title}</h3>
            <iframe src={videoLink}>

            </iframe>
        </div>
    )
}

function _ImgNote({ info: { title, imgUrl } }) {
    return (
        <div>
            <h3>{title}</h3>
            <img src={imgUrl}>

            </img>
        </div>
    )
}
function _TodosNote({ info: { title, todos } }) {
    console.log(todos)
    return (
        <div>
            <h3>{title}</h3>
            <ul className="todo-list">
                {todos.map((todo) => {
                    return (
                        <li key={utilService.makeId()}>
                            <p  className="todo-txt" >{todo.txt}</p>
                            <input className="todo-check"  type="checkbox"
                                value={todo.DoneAt}
                            />
                        </li>
                    )
                })}
            </ul>
        </div >
    )
}


