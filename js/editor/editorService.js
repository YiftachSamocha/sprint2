'use strict'
var gEditedMeme = {
    id: '',
    selectedImgId: '',
    selectedLineIdx: 0,
    line: {
        txt: '',
        size: 20,
        color: ''
    },
    

}

function getEditedMeme() {
    return gEditedMeme
}

function setMeme(meme) {
    gEditedMeme = meme
}


function setImg(imageId) {
    gEditedMeme.selectedImgId = imageId
}

function setText(text) {
    gEditedMeme.line.txt = text
}

function setColor(color) {
    gEditedMeme.line.color = color
}

function setMemeId(id) {
    gEditedMeme.id = id
}
