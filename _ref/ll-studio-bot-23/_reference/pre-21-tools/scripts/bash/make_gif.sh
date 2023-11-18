#!/bin/bash

DIR=$(dirname "$1")
PALETTEPATH="${DIR}/palette.png"
FILENAME=$(basename "$1")
FILENAME="${FILENAME%.*}"
GIFPATH="${DIR}/${FILENAME}.gif"
ffmpeg -i $1 -vf palettegen $PALETTEPATH
ffmpeg -i $1 -i $PALETTEPATH -vf scale=640:360 -y $GIFPATH
rm $PALETTEPATH
