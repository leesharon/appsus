export const dataService = {
    getDemoData
}

const note0 = {
    id: "oA1RD8",
    info: {
        imgUrl: "assets/img/sombrerro.jpg",
        title: "Bandana"
    },
    isPinned: true,
    style: { backgroundColor: "khaki" },
    type: "note-img"
}
const note11 = {
    id: "Uhdrbe",
    info: {
        imgUrl: "assets/img/swimmingpool.jpg",
        title: "A swimming pool"
    },
    isPinned: false,
    style: { backgroundColor: "khaki" },
    type: "note-img"
}
// const note12 = {
//     id: "oA1RD8",
//     info: {
//         imgUrl: "assets/img/sombrerro.jpg",
//         title: "Bandana"
//     },
//     isPinned: false,
//     style: { backgroundColor: "khaki" },
//     type: "note-img"
// }
const note1 = {
    id: "HNaPei",
    info: {
        title: "Words ",
        todos: [
            { txt: "south prevent mayor prediction", doneAt: null },
            { txt: "neglect habitat piano land", doneAt: "2022-08-27T12:30:28.814Z" },
            { txt: "biology mourning investment major", doneAt: "2022-08-27T12:30:30.379Z" },
            { txt: "chaos station alcohol include", doneAt: "2022-08-27T12:30:31.292Z" },
            { txt: "nomination retreat door potential", doneAt: null }]
    },
    isPinned: false,
    style: {
        backgroundColor: "khaki"
    },
    type: "note-todos"
}
const note2 = {
    id: "N4ehOL",
    info: {
        title: "holiday productive",
        todos: [
            { txt: "century regulation beer amuse storage grand", doneAt: "2022-08-27T12:30:26.391Z" },
            { txt: "patrol payment vision", doneAt: null },
            { txt: "econobox net winter curriculum us", doneAt: null }]
    },
    isPinned: false,
    style: { backgroundColor: "white" },

    type: "note-todos"
}
const note3 = {
    id: "KGPitq",
    info: {
        title: "Did you know??",
        txt: "If you see this note there is a probabilty of 0.45 that you did a note app aswell "
    },
    isPinned: false,
    style: { backgroundColor: "peru" },
    type: "note-txt"
}
const note4 = {
    id: "KTOmta",
    info: {
        title: "Daily french",
        txt: " À vaillant coeur rien d’impossible. -Jacques Cœur"
    },
    isPinned: false,
    style: {
        backgroundColor: "lightgreen"
    },
    type: "note-txt"
}
const note5 = {
    id: "K8mai4",
    info: {
        title: "Welcome to Keep",
        txt: "here you can make notes of many kinds pressing the specific buttons,\nthis platform is great for helping you get extra Mbs to you brain memory"
    },
    isPinned: true,
    style: { backgroundColor: "lightcoral" },
    type: "note-txt"
}
const note6 = {
    id: "oBg0Kj",
    info: {
        title: "Lorem Ipsum",
        txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mi orci, luctus ut neque eu, eleifend ullamcorper nisl. Aenean a luctus nunc. Integer purus ipsum, tincidunt tincidunt ullamcorper nec, pretium sit amet nunc."
    },
    isPinned: false,
    style: { backgroundColor: "lightskyblue" },
    type: "note-txt"
}
const note7 = {
    id: "pwal6f",
    info: {
        title: "DONT FOGREGT!",
        txt: "31/2 Dentist"
    },
    isPinned: false,
    style: { backgroundColor: "slateblue" },
    type: "note-txt"
}
const note8 = {
    id: "Kb8bdo",
    info: { title: "Nice", videoLink: "https://www.youtube.com/embed/WOkeB4ZTjFM" },
    isPinned: false,
    style: { backgroundColor: "lightgreen" },
    type: "note-video"
}
const note9 = {
    id: "Vf8SCN",
    info: { title: "", videoLink: "https://www.youtube.com/embed/Xp-d9Gp9D54" },
    isPinned: false,
    style: { backgroundColor: "peru" },
    type: "note-video"
}
const note10 = {
    id: "vR7ngU",
    info: {
        title: "Bolognese",
        todos: [
            { txt: "Chop mirepoix which is celery onion and carrot finely", doneAt: null },
            { txt: "Add salt and saute them over medium heat with ", doneAt: null },
            { txt: "once the vegtables have reduced to 30% remove from the pot", doneAt: null },
            { txt: "Heat the pot and add the meat", doneAt: null },
            { txt: "Once the meat has browned enough add the mirepoix back and reduce with red wine", doneAt: null },
            { txt: "after the wine has evaported add canned tomatoes and bouquet garni", doneAt: null },
            { txt: "let simmer on low heat for around 2 hours", doneAt: null }]
    },
    isPinned: false,
    style: { backgroundColor: "lightcoral" },
    type: "note-todos"
}

function getDemoData() {
    return [note0, note1, note2, note3, note4, note5, note6, note7, note8, note9, note10, note11]
}