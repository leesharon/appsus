
export function NotePreview({ note }) {

    function DynamicCmp() {
        switch (note.type) {
            case ('note-txt'):
                return _TxtNote(note)
            case ('note-video'):
                return _VideoNote(note)
            case ('note-img'):
                return _ImgNote(note)
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
// function _TodosNote({ info: { title, imgUrl } }) {
//     return (
//         <div>
//             <h3>{title}</h3>
//             <img src={imgUrl}>

//             </img>
//         </div>
//     )
// }


