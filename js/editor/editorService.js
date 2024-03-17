'use strict'
const SIZE = 10
var gEditedMeme = {
    canvasId: '',
    selectedImgId: '',
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: SIZE * 4,
        fillColor: '',
        strokeColor: '',
        font: 'Averia',
        align: '',
    }],
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
    gEditedMeme.lines[gEditedMeme.selectedLineIdx].txt = text
}

function addLine() {
    const line = {
        txt: '',
        size: SIZE * 4,
        fillColor: '',
        strokeColor: '',
        font: 'Averia',
        align: '',
    }

    gEditedMeme.lines.push(line)
}

function selectLine(lineIdx) {
    if (lineIdx > 1) return
    gEditedMeme.selectedLineIdx = lineIdx
}

function deleteLine() {
    if (getEditedMeme().lines.length === 1) {
        gEditedMeme.lines = []
        addLine()
        return
    }
    const deletedIdx = gEditedMeme.selectedLineIdx
    gEditedMeme.lines.splice(deletedIdx, 1)
}


function setFillColor(color) {
    gEditedMeme.lines[gEditedMeme.selectedLineIdx].fillColor = color
}

function setStrokeColor(color) {
    gEditedMeme.lines[gEditedMeme.selectedLineIdx].strokeColor = color
}

function setFont(font) {
    gEditedMeme.lines[gEditedMeme.selectedLineIdx].font = font
}

function setAlign(align) {
    gEditedMeme.lines[gEditedMeme.selectedLineIdx].align = align
}

function setEditedMemeCanvasId(id) {
    gEditedMeme.canvasId = id
}

function setSize(change) {
    let memeSize
    if (change === 'bigger') {
        memeSize = SIZE
    } else {
        memeSize = -SIZE
    }
    gEditedMeme.lines[gEditedMeme.selectedLineIdx].size += memeSize

}
