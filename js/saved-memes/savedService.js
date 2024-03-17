'use strict'
var gSaved = getFromStorage(SAVES_MEMES_KEY) || []

function getSavedMemes(){
    return gSaved
}

function addSavedMeme(meme) {
    gSaved.push(meme)
}