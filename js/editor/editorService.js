'use strict'
const SIZE = 10
var gEditedMeme = {
    id: '',
    selectedImgId: '',
    selectedLineIdx: 0,
    line: {
        txt: '',
        size: SIZE * 4,
        fillColor: '',
        strokeColor: '',
        font: '',
        align: '',
    },


}

function getEditedMeme() {
    return gEditedMeme
}

function setEditedMeme(meme) {
    gEditedMeme = meme
}


function setImg(imageId) {
    gEditedMeme.selectedImgId = imageId
}

function setText(text) {
    gEditedMeme.line.txt = text
}

function setFillColor(color) {
    gEditedMeme.line.fillColor = color
}

function setStrokeColor(color) {
    gEditedMeme.line.strokeColor = color
}

function setFont(font) {
    gEditedMeme.line.font = font
}

function setAlign(align) {
    gEditedMeme.line.align = align
}

function setEditedMemeId(id) {
    gEditedMeme.id = id
}

function setSize(change) {
    let memeSize
    if (change === 'bigger') {
        memeSize = SIZE
    } else {
        memeSize = -SIZE
    }
    gEditedMeme.line.size += memeSize

}
