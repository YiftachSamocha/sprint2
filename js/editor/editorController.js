'use strict'
var gElCanvas
var gCtx

var gSavedMemes = []

const MEME_TITLE = 'My Meme'

function renderMeme() {
    const meme = getEditedMeme()
    //image
    const image = document.getElementById(meme.selectedImgId)
    const gallery = document.querySelector('.gallery')
    gallery.classList.remove('hide')

    gElCanvas = document.querySelector('.meme.' + meme.id)
    gCtx = gElCanvas.getContext('2d')

    gElCanvas.height = image.clientHeight
    gElCanvas.width = image.clientWidth

    gallery.classList.add('hide')
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)


    //color
    const fillColor = meme.line.fillColor
    const strokeColor = meme.line.strokeColor
    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = strokeColor

    //text
    const text = meme.line.txt
    const size = meme.line.size
    gCtx.font = size + 'px David'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, 12, 70)
    gCtx.strokeText(text, 12, 70)
}

function onImgSelect(imageId) {
    setImg(imageId)
    setEditedMemeId('main')
    renderMeme()
    showSection('editor')
}


function onSetText(txt) {
    setText(txt)
    renderMeme()

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

function onDownload(elLink) {
    setEditedMemeId(createId())
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = MEME_TITLE
    addSavedMeme(gEditedMeme)
    saveToStorage(SAVES_MEMES_KEY, getSavedMemes())
    showSection('saved-memes')
    renderSavedMemes()
}

function setCanvas(canvas) {
    gElCanvas = canvas
}
