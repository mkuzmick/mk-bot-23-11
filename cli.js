#!/usr/bin/env node

var figlet = require('figlet');
var clear = require('clear');
const { llog } = require('./src/utils/ll-utilities')
const path = require('path');
// const { transcribeFile } = require('./src/ll-bots/transcription-bot')
// const hackmd2pdf = require('./src/utils/ll-hackmd-tools/hackmd-to-pdf')
// const { finetune } = require('./src/ll-bots/open-ai-bot')
const { logMidi } = require('./src/utils/ll-midi-tools')
require("dotenv").config({ path: __dirname + `/.env.cli` });
const { openAIVision } = require('./src/utils/ll-openai-tools');
global.ROOT_DIR = path.resolve(__dirname);

// store any arguments passed in using yargs
var yargs = require('yargs').argv;

console.log("launching it.")


if (yargs.logMidi) {
    llog.magenta(`going to log midi input`);
    logMidi();
} else if (yargs.openAIVision) {
    openAIVision({url: yargs.openAIVision, outputDir: `${ROOT_DIR}/_output`});
}
else {
    console.log(`sorry, you didn't enter a recognized command.`)
}