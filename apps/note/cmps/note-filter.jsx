export class NoteFilter extends React.Component {




    render() {

        const { onFilterBy, filterBarClass } = this.props
        return (
            <aside className={`note-filter ${filterBarClass}`}>
                <button onClick={() => { onFilterBy('note-video') }}>
                    <i className="fa-brands fa-youtube"></i><span>Video</span></button>
                <button onClick={() => { onFilterBy('note-img') }}>
                    <i className="fa-solid fa-image"></i> <span>Image</span></button>
                <button onClick={() => { onFilterBy('note-todos') }}>
                    <i className="fa-solid fa-list-check"></i><span>Todo</span></button>
                <button onClick={() => { onFilterBy('note-txt') }}>
                    <i className="fa-solid fa-file-lines"> </i><span>Text</span></button>
            </aside>
        )
    }
}