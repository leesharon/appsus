export class NoteFilter extends React.Component {


    state = {
        isClicked: {
            'note-video': false,
            'note-img': false,
            'note-todos': false,
            'note-txt': false,
        }
    }
    onClickBtn = (value) => {
        this.setState({
            isClicked: {
                ...this.state.isClicked,
                [value]: !this.state.isClicked[value]
            }
        })

    }

    getClassName = (value) => {
        if (this.state.isClicked[value]) {
            return 'clicked'
        }
        return 'unclicked'

    }

    render() {
        const { getClassName, onClickBtn } = this
        const { onFilterBy, filterBarClass } = this.props
        return (
            <aside className={`note-filter ${filterBarClass}`}>
                <button className={getClassName('note-video')}
                    onClick={() => { onClickBtn('note-video'); onFilterBy('note-video') }}>
                    <i className="fa-brands fa-youtube"></i><span>Video</span></button>
                <button className={getClassName('note-img')}
                    onClick={() => { onClickBtn('note-img'); onFilterBy('note-img') }}>
                    <i className="fa-solid fa-image"></i> <span>Image</span></button>
                <button className={getClassName('note-todos')}
                    onClick={() => { onClickBtn('note-todos'); onFilterBy('note-todos') }}>
                    <i className="fa-solid fa-list-check"></i><span>Todo</span></button>
                <button className={getClassName('note-txt')}
                    onClick={() => { onClickBtn('note-txt'); onFilterBy('note-txt') }}>
                    <i className="fa-solid fa-file-lines"> </i><span>Text</span></button>
            </aside>
        )
    }
}