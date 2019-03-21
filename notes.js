const fs = require('fs')
const chalk = require('chalk')
const getNotes = () => 'Your notes...'
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else console.log(chalk.red.inverse('Note title taken!'))
}
const saveNotes = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes))

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString())
    } catch (e) {
        return []
    }
}
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note removed!'))
    } else console.log(chalk.red.inverse('No note found!'))
}
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes...'))
    notes.forEach(note => {
        console.log(`Title: ${note.title} | Body: ${note.body}`)
    })
}
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(`Title: ${note.title} | Body: ${note.body}`)
    } else console.log(chalk.red(`No note found with title: ${title}`))
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
