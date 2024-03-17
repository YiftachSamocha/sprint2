'use strict'
var gSaved = getFromStorage(SAVES_MEMES_KEY) || []

function getSavedMemes() {
    return gSaved
}

function addSavedMeme(meme) {
    gSaved.push(meme)
}

function getMemeById(memeId) {
    for (var i = 0; i < gSaved.length; i++) {
        if (gSaved[i].id === memeId) return gSaved[i]
    }
}

function removeMeme(memeId) {
    for (var i = 0; i < gSaved.length; i++) {
        if (gSaved[i].id === memeId) gSaved.splice(i, 1)
    }
}