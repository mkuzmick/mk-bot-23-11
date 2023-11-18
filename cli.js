#!/usr/bin/env node

var figlet = require('figlet');
var clear = require('clear');
const { llog } = require('./src/utils/ll-utilities')
// const { transcribeFile } = require('./src/ll-bots/transcription-bot')
// const hackmd2pdf = require('./src/utils/ll-hackmd-tools/hackmd-to-pdf')
// const { finetune } = require('./src/ll-bots/open-ai-bot')
const { logMidi } = require('./src/utils/ll-midi-tools')
require("dotenv").config({ path: __dirname + `/.env.cli` });


// store any arguments passed in using yargs
var yargs = require('yargs').argv;

console.log("launching it.")

// options: rename, makefolders, proxy, proxyf2, 

// if (yargs.transcribe) {
//     transcribeFile({filePath: yargs.transcribe})
// } else if (yargs.rename) {
//     llog.magenta(`going to rename`, yargs)
// } else if (yargs.phackmd) {
//     llog.magenta(`going to convert ${yargs.phackmd} to markdown`);
//     hackmd2pdf(yargs.phackmd);
// } else if (yargs.finetune) {
//     llog.magenta(`going to handle ${yargs.finetune}`);
//     finetune({txt: yargs.txt});
// } else 

if (yargs.logMidi) {
    llog.magenta(`going to log midi input`);
    logMidi();
} else {
    console.log(`sorry, you didn't enter a recognized command.`)
}