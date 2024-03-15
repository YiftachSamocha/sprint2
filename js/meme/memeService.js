'use strict'
var gMeme = {
    selectedImgId: '',
    selectedLineIdx: 0,
    line: {
        txt: '',
        size: 20,
        color: ''
    }

}

function getMeme() {
    return gMeme
}

function setImg(imageId) {
    gMeme.selectedImgId = imageId
}

function setText(text) {
    gMeme.line.txt = text
}

function setColor(color) {
    gMeme.line.color = color
}
