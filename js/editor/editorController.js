'use strict'
var gElCanvas
var gCtx

const MEME_TITLE = 'My Meme'

function renderMeme() {
    const currLineIdx = getEditedMeme().selectedLineIdx
    renderImage()
    for (var i = 0; i < getLinesLength(); i++) {
        selectLine(i)
        renderLine()
    }
    if (getEditedMeme().isFramed) renderFrame(currLineIdx)
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

    const fillColor = line.fillColor
    const strokeColor = line.strokeColor
    const text = line.txt
    const size = line.size
    const font = line.font
    const align = line.align
    var x = line.location.x
    const y = line.location.y
    const PADDING = size / 4

    gCtx.fillStyle = fillColor
    gCtx.strokeStyle = strokeColor
    gCtx.font = size + 'px ' + font
    gCtx.textAlign = align

    switch (align) {
        case '':
            break
        case 'left':
            x = PADDING
            break
        case 'center':
            x = gElCanvas.width / 2
            break
        case 'right':
            x = gElCanvas.width - PADDING
    }

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}


function renderFrame(lineIdx) {
    const line = getEditedMeme().lines[lineIdx]
    const PADDING = line.size / 4
    let x = line.location.x
    let y = line.location.y
    const w = gCtx.measureText(line.txt).width + PADDING
    const h = line.size

    switch (line.align) {
        case '':
            break
        case 'left':
            x = PADDING
            break
        case 'center':
            x = gElCanvas.width / 2 - (gCtx.measureText(line.txt).width / 2) - 0.5 * PADDING
            break
        case 'right':
            x = gElCanvas.width - gCtx.measureText(line.txt).width - 1.5 * PADDING
    }
    y = y - 3 * PADDING

    const frame = {
        x: x,
        y: y,
        w: w,
        h: h,
    }
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(frame.x, frame.y, frame.w, frame.h)
}

function onImgSelect(imageId) {
    setImg(imageId)
    setCanvasId('main')
    addLine()
    const editor = document.querySelector('.meme.main')
    setLocation(editor.width / 2, editor.height / 5 + SIZE / 2)
    console.log(getEditedMeme())
    renderMeme()
    showSection('editor')
}


function onSetText(txt) {
    setText(txt)
    renderMeme()

}

function onSwitchLine() {
    const currLineIdx = getEditedMeme().selectedLineIdx
    let nextLineIdx = currLineIdx + 1
    if (nextLineIdx === getLinesLength()) nextLineIdx = 0
    selectLine(nextLineIdx)
    renderMeme()
    document.querySelector('.text input').value = getEditedMeme().lines[getEditedMeme().selectedLineIdx].txt
}

function onAddLine() {
    addLine()
    selectLine(getLinesLength() - 1)
    if (getEditedMeme().lines.length === 2) {
        setLocation(gElCanvas / 2, (gElCanvas.height / 5) * 5 - SIZE)
    }
    renderMeme()
    document.querySelector('.text input').value = ''
}

function onDeleteLine() {
    deleteLine()
    if (getLinesLength() === 0) {
        addLine()
        selectLine(0)
        const editor = document.querySelector('.meme.main')
        setLocation(editor.width / 2, editor.height / 5 + SIZE / 2)
    }
    selectLine(getLinesLength() - 1)
    renderMeme()
    document.querySelector('.text input').value = getEditedMeme().lines[getEditedMeme().selectedLineIdx].txt
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

function onSetHeight(change) {
    let x = getEditedMeme().lines[getEditedMeme().selectedLineIdx].location.x
    let y = getEditedMeme().lines[getEditedMeme().selectedLineIdx].location.y
    if (change === 'higher') {
        y -= SIZE
    }
    else {
        y += SIZE
    }
    setLocation(x, y)
    renderMeme()
}

function onSetLocation(x, y) {
    setLocation(x, y)
    renderMeme()
}

function onDownload(elLink) {
    setIsFramed(false)
    renderMeme()

    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = MEME_TITLE

    setCanvasId(createId())
    addSavedMeme(getEditedMeme())
    saveToStorage(SAVES_MEMES_KEY, getSavedMemes())
    showSection('saved-memes')
    renderSavedMemes()
    setIsFramed(true)

}

function clearEditor() {
    clearEditedMeme()
    const inputs = document.querySelectorAll('input')
    inputs.forEach(element => {
        element.value = ''
    })
    const fontInput = document.querySelector('select')
    fontInput.options[0].selected = true
}


