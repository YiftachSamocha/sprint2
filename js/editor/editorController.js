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
    const color = meme.line.color
    gCtx.fillStyle = color

    //text
    const text = meme.line.txt
    gCtx.font = '60px David'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, 12, 70)
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

function onSetColor(color) {
    setColor(color)
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
