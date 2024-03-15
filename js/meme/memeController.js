'use strict'
const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

var gSavedMemes = []

function renderMeme() {
    const meme= getMeme()
    //image
    const image= document.getElementById(meme.selectedImgId)
    const gallery= document.querySelector('.gallery')
    gallery.classList.remove('hide')
    gElCanvas.height = image.clientHeight
    gElCanvas.width = image.clientWidth
    gallery.classList.add('hide')
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)

    //color
    const color= meme.line.color
    gCtx.fillStyle = color

    //text
    const text= meme.line.txt
    gCtx.font = '60px David'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, 12, 70)
}

function onImgSelect(imageId) {
    setImg(imageId)
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
