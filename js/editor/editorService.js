'use strict'
const SIZE = 10
var gEditedMeme = {
    canvasId: '',
    selectedImgId: '',
    selectedLineIdx: 0,
    lines: [],
    isFramed: true,
    // Line Object:
    //    {
    //     txt: '',
    //     size: SIZE * 4,
    //     fillColor: '',
    //     strokeColor: '',
    //     font: 'Averia',
    //     align: '',
    //     location: { x: '', y: '', },
    // }
}

function getEditedMeme() {
    return gEditedMeme
}

function setEditedMeme(meme) {
    gEditedMeme = meme
}

function clearEditedMeme() {
    gEditedMeme = {
        canvasId: '',
        selectedImgId: '',
        selectedLineIdx: 0,
        lines: [],
        isFramed: true,
    }
}


function setImg(imageId) {
    gEditedMeme.selectedImgId = imageId
}

function setText(text) {
    gEditedMeme.lines[gEditedMeme.selectedLineIdx].txt = text
}

function addLine() {
    const canvas = document.querySelector('.meme.main')
    const line = {
        txt: '',
        size: SIZE * 4,
        fillColor: '',
        strokeColor: '',
        font: 'Averia',
        align: 'center',
        location: { x: canvas.width / 2, y: canvas.height / 2, },
    }
    gEditedMeme.lines.push(line)
}

function selectLine(lineIdx) {
    gEditedMeme.selectedLineIdx = lineIdx
}

function deleteLine() {
    const deletedIdx = gEditedMeme.selectedLineIdx
    gEditedMeme.lines.splice(deletedIdx, 1)
}

function getLinesLength() {
    return gEditedMeme.lines.length
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

function setLocation(x, y) {
    gEditedMeme.lines[gEditedMeme.selectedLineIdx].location.x = x
    gEditedMeme.lines[gEditedMeme.selectedLineIdx].location.y = y
}

function setCanvasId(id) {
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

function setIsFramed(isFramed) {
    gEditedMeme.isFramed = isFramed
}
