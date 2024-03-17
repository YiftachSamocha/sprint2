'use strict'
var gElCanvas
var gCtx

var gSavedMemes = []

const MEME_TITLE = 'My Meme'

function renderMeme() {
    const currLineIdx = getEditedMeme().selectedLineIdx
    renderImage()
    selectLine(0)
    renderLine()
    selectLine(1)
    renderLine()
    selectLine(currLineIdx)

}

function renderImage() {
    const meme = getEditedMeme()
    //image
    const image = document.getElementById(meme.selectedImgId)
    const gallery = document.querySelector('.gallery')
    gallery.classList.remove('hide')

    gElCanvas = document.querySelector('.meme.' + meme.canvasId)
    gCtx = gElCanvas.getContext('2d')

    gElCanvas.height = image.clientHeight
    gElCanvas.width = image.clientWidth

    gallery.classList.add('hide')
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderLine() {
    const meme = getEditedMeme()
    const line = meme.lines[meme.selectedLineIdx]
    if (!line) return

    //color
    const fillColor = line.fillColor
    const strokeColor = line.strokeColor
    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = strokeColor

    //text
    const text = line.txt
    const size = line.size
    const font = line.font
    const align = line.align
    let x
    let y
    if (meme.selectedLineIdx === 0) {
        y = gElCanvas.height / 4
    } else {
        y = (gElCanvas.height / 4) * 3
    }
    gCtx.font = size + 'px ' + font
    gCtx.textAlign = align
    switch (align) {
        case '':
        case 'left':
            x = 0
            break
        case 'center':
            x = gElCanvas.width / 2
            break
        case 'right':
            x = gElCanvas.width
    }
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onImgSelect(imageId) {
    setImg(imageId)
    setEditedMemeCanvasId('main')
    renderMeme()
    showSection('editor')
}


function onSetText(txt) {
    setText(txt)
    renderMeme()

}

function onSwitchLine() {
    if (getEditedMeme().lines.length === 1) return
    const currLineIdx = getEditedMeme().selectedLineIdx
    if (currLineIdx === 0) {
        selectLine(1)
    }
    else {
        selectLine(0)
    }
    document.querySelector('.text input').value = getEditedMeme().lines[getEditedMeme().selectedLineIdx].txt
}

function onAddLine() {
    if (getEditedMeme().selectedLineIdx === 1) return
    addLine()
    selectLine(1)
    document.querySelector('.text input').value = ''
}

function onDeleteLine() {
    deleteLine()
    selectLine(0)
    renderMeme()
    document.querySelector('.text input').value = getEditedMeme().lines[0].txt
}

function onSetFillColor(color) {
    setFillColor(color)
    renderMeme()
}

function onSetStrokeColor(color) {
    setStrokeColor(color)
    renderMeme()
}

function onChangeSize(change) {
    setSize(change)
    renderMeme()
}

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function onSetAlign(align) {
    setAlign(align)
    renderMeme()
}

function onDownload(elLink) {
    setEditedMemeCanvasId(createId())
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = MEME_TITLE
    addSavedMeme(gEditedMeme)
    saveToStorage(SAVES_MEMES_KEY, getSavedMemes())
    showSection('saved-memes')
    renderSavedMemes()
}


