const midi = require('midi');
const llog = require('../ll-utilities/ll-logs');

module.exports.logMidi = () => {
    llog.yellow(`Initializing MIDI Input...`);

    // Create a new instance of the MIDI input interface.
    const input = new midi.Input();

    // Configure a callback function for incoming MIDI messages.
    input.on('message', (deltaTime, message) => {
        // deltaTime is the time since the last message in seconds
        // message is an array of MIDI bytes (e.g., [144, 60, 100] for note on)
        llog.yellow(`Received MIDI message:`, message);
        llog.yellow(`Delta Time:`, deltaTime);
    });

    // Open the first available MIDI input port.
    input.openPort(0);

    llog.green(`MIDI Input is now open. Listening for messages...`);
};
