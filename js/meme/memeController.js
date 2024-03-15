'use strict'
const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

var gSavedMemes = []

function renderMeme(image) {
    gElCanvas.height = image.clientHeight
    gElCanvas.width = image.clientWidth
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
    showSection('editor')

}