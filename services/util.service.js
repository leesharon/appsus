export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    getDatePreview,
    trimString,
    getCurrFullDate,
    getCurrYear,
    getRandomEmailAddress,
    getEmailStatus,
    getRandomNoteColor
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const newDate = new Date(date)
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[newDate.getMonth()]
}

function getDatePreview(date, isShort) {
    const dateNum = new Date(date).getDate()
    let monthName = getMonthName(date)
    if (isShort) monthName = monthName.substring(0, 3)
    return monthName + ' ' + dateNum
}

function trimString(string) {
    const maxLength = 70
    var trimmedStr = string.substring(0, maxLength)
    trimmedStr = trimmedStr.substring(0, Math.min(trimmedStr.length, trimmedStr.lastIndexOf(" ")))
    trimmedStr += '...'
    return trimmedStr
}

function getCurrYear() {
    return new Date().getFullYear()
}

function getCurrFullDate() {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1 + ''
    if (month.length < 2) month = 0 + month
    let day = date.getDate() + ''
    if (day.length < 2) day = 0 + day

    return `${year}-${month}-${day}`
}

function getRandomEmailAddress() {
    const addresses = ['VScode', 'Investing.', 'Spectacles', 'FontAwesome', 'NordVPN', 'Slack', 'Google', 'Apple', 'Coding Academy', 'Wix', 'Amazon', 'GitHub', 'Cal', 'LinkedIn', 'Dropbox', 'Avocode', 'Facebook', 'Instagram']
    const idx = getRandomIntInclusive(0, addresses.length - 1)
    return addresses[idx]
}

function getEmailStatus() {
    const statusList = ['trash', 'starred', '']
    const idx = getRandomIntInclusive(0, statusList.length - 1)
    return statusList[idx]
}

function getRandomNoteColor() {
    const colors = ['peru', 'lightskyblue', 'slateblue', 'lightcoral', 'lightgreen', 'plum', 'white','khaki','orange']
    return colors[getRandomIntInclusive(0, 8)]
}