'use strict'
var gElCanvas
var gCtx

var gSavedMemes = []

const MEME_TITLE = 'My Meme'
const FRAME_PADDING = 5

function renderMeme() {
    const currLineIdx = getEditedMeme().selectedLineIdx
    renderImage()
    selectLine(0)
    renderLine()
    selectLine(1)
    renderLine()
    renderFrame(currLineIdx)
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
    if (line.align === '') line.align = 'center'


    const fillColor = line.fillColor
    const strokeColor = line.strokeColor
    const text = line.txt
    const size = line.size
    const font = line.font
    const align = line.align
    let x
    let y


    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = strokeColor
    gCtx.font = size + 'px ' + font
    gCtx.textAlign = align
    switch (align) {
        case 'left':
            x = FRAME_PADDING
            break
        case '':
        case 'center':
            x = gElCanvas.width / 2
            break
        case 'right':
            x = gElCanvas.width - FRAME_PADDING
    }
    if (meme.selectedLineIdx === 0) {
        y = gElCanvas.height / 4
    } else {
        y = (gElCanvas.height / 4) * 3
    }
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)


}

function renderFrame(lineIdx) {
    const line = getEditedMeme().lines[lineIdx]
    let x
    let y
    const w = gCtx.measureText(line.txt).width + 2 * FRAME_PADDING
    const h = line.size

    gCtx.textAlign = line.align
    switch (line.align) {
        case 'left':
            x = FRAME_PADDING
            break
        case '':
        case 'center':
            x = gElCanvas.width / 2 - (gCtx.measureText(line.txt).width / 2) - FRAME_PADDING
            break
        case 'right':
            x = gElCanvas.width - gCtx.measureText(line.txt).width - 3 * FRAME_PADDING
    }
    if (lineIdx === 0) {
        y = gElCanvas.height / 4
    } else {
        y = (gElCanvas.height / 4) * 3
    }
    y = y - (line.size / 2) - 2 * FRAME_PADDING

    const frame = {
        x: x,
        y: y,
        w: w,
        h: h,
    }
    gCtx.strokeRect(frame.x, frame.y, frame.w, frame.h)


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
        renderMeme()
    }
    else {
        selectLine(0)
        renderMeme()
    }
    document.querySelector('.text input').value = getEditedMeme().lines[getEditedMeme().selectedLineIdx].txt
}

function onAddLine() {
    if (getEditedMeme().lines.length === 2) return
    addLine()
    selectLine(1)
    renderMeme()
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


