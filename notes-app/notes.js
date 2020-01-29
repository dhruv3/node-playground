const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({title: title, body: body});
        saveNotes(notes);
        console.log(chalk.green.inverse("Note Added!"));
    }
    else{
        console.log(chalk.red.inverse("Note Title taken!")) ;
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.txt", dataJSON);
}

const loadNotes = () => {
    try{
        const dataBuffered = fs.readFileSync("notes.txt");
        const parseData = JSON.parse(dataBuffered.toString());
        return parseData;
    }
    catch{
        return [];
    }

}

const removeNote = (title) => {
    const notes = loadNotes();
    const updatedNotes = notes.filter((note) => note.title != title )

    if(notes.length !== updatedNotes.length){
        console.log(chalk.green.inverse("Note removed!"));
        saveNotes(updatedNotes);
    }
    else{
        console.log(chalk.red.inverse("No note found!"));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue("Your notes"));
    notes.forEach(elem => {
        console.log(elem.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const noteFound = notes.find((note) => note.title == title);
    if(!noteFound){
        console.log(chalk.red.inverse("Note does not exist!"))
    }
    else{
        console.log(chalk.green.inverse(noteFound.title))
        console.log(noteFound.body)
    }
}

module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}