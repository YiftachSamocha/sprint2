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
    const font = meme.line.font
    const align = meme.line.align
    let x = 0
    let y = gElCanvas.height/2
    gCtx.font = size + 'px ' + font
    gCtx.textAlign = align
    switch (align) {
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

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function onSetAlign(align) {
    setAlign(align)
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


