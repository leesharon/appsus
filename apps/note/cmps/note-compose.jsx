import { noteService } from "../services/note.service.js";

export class NoteCompose extends React.Component {

    state = {
        info:'',
        type: 'note-txt'
    }



    onHandleChange = ({target:{name,value}})=>{

    }
    render() {
        const { info, type } = this.state
        return (
            <section>
                <input 
                type="text" 
                name="info"
                value={info}
                />

                <button>img</button>
                <button>todos</button>
                <button>video</button>
                <button>text</button>
            </section>
        )
    }
}