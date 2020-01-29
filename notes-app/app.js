const chalk = require('chalk');
const yargs = require('yargs');
const notesUtil = require('./notes.js');

yargs.version("1.1.0");

yargs.command({
    command: "add",
    describe: "Add a note",
    builder:{
        title:{
            describe: "Note Title",
            demandOption: true,
            type: "string"
        },
        body:{
            describe: "Note Body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        notesUtil.addNotes(argv.title, argv.body);
        // console.log("Adding a new note")
        // console.log("Title: " + argv.title + "\tBody: " + argv.body);
    }
})

yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder:{
        title:{
            describe: "Note title you want to remove",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        notesUtil.removeNote(argv.title)
    }
})

yargs.command({
    command: "list",
    describe: "List all notes",
    handler(){
        notesUtil.listNotes();
    }
})

yargs.command({
    command: "read",
    describe: "Read a note",
    handler(argv){
        notesUtil.readNote(argv.title)
    }
})

yargs.parse()
// console.log(yargs.argv)