'use strict'
var gElCanvas
var gCtx

const MEME_TITLE = 'My Meme'

function renderMeme() {
    const currLineIdx = getEditedMeme().selectedLineIdx
    renderImage()
    removeMovement()
    for (var i = 0; i < getLinesLength(); i++) {
        selectLine(i)
        renderLine()
    }
    if (getEditedMeme().isFramed) renderFrame(currLineIdx)
    addMovement()
    selectLine(currLineIdx)
}

function renderImage() {
    const imgId = getEditedMeme().selectedImgId
    const imgIdx = parseInt(imgId.substring(3))

    const image = new Image()
    image.src = getImgs()[imgIdx - 1].url
    gElCanvas = document.querySelector('.meme.' + getEditedMeme().canvasId)
    gCtx = gElCanvas.getContext('2d')

    const imageHeight = getSizes(imgIdx - 1).h
    const imageWidth = getSizes(imgIdx - 1).w
    var canvasHeight
    var canvasWidth
    canvasWidth = gEditorImgSize
    canvasHeight = (canvasWidth * imageHeight) / imageWidth
    gElCanvas.width = canvasWidth
    gElCanvas.height = canvasHeight

    gCtx.drawImage(image, 0, 0, canvasWidth, canvasHeight)
}

function renderLine() {
    const line = getLine()
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

function makeClickableFrame(event) {
    for (var i = 0; i < getLinesLength(); i++) {
        const line = getEditedMeme().lines[i]
        const frame = getFramePoitions(line)
        const value = line.txt
        const startX = frame.x
        const endX = frame.x + frame.w
        const startY = frame.y
        const endY = frame.y + frame.h

        if (event.offsetX >= startX && event.offsetX <= endX && event.offsetY >= startY && event.offsetY <= endY) {
            selectLine(i)
            renderMeme()
            document.querySelector('.text input').value = value
        }
    }
}


function getFramePoitions(line) {
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

    return {
        x: x,
        y: y,
        w: w,
        h: h,
    }
}

function renderFrame(lineIdx) {
    const line = getEditedMeme().lines[lineIdx]
    const frame = getFramePoitions(line)
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(frame.x, frame.y, frame.w, frame.h)
}

function startDrag(event) {
    const line = getLine()
    const frame = getFramePoitions(line)
    const startX = frame.x
    const endX = frame.x + frame.w
    const startY = frame.y
    const endY = frame.y + frame.h
    if (event.offsetX >= startX && event.offsetX <= endX && event.offsetY >= startY && event.offsetY <= endY) {
        setIsDragged(true)
        setDragDifference(event.offsetX - startX, endY - event.offsetY)
    }
}

function drag(event) {
    if (!getLine().drag.isDragged) return
    const x = event.offsetX - getLine().drag.loc.w
    const y = event.offsetY + getLine().drag.loc.h
    setLocation(x, y)
    setAlign('')
    renderMeme()
}

function endDrag() {
    setIsDragged(false)
}

function addMovement() {
    gElCanvas.addEventListener('mousedown', startDrag)
    gElCanvas.addEventListener('mousemove', drag)
    gElCanvas.addEventListener('mouseup', endDrag)
    gElCanvas.addEventListener('click', makeClickableFrame)
}

function removeMovement() {
    gElCanvas.removeEventListener('mousedown', startDrag)
    gElCanvas.removeEventListener('mousemove', drag)
    gElCanvas.removeEventListener('mouseup', endDrag)
    gElCanvas.removeEventListener('click', makeClickableFrame)
}

function renderStickersGallery() {
    const idx = gStickers.idx
    var stickersHTML = ''
    const stickers = document.querySelector('.stickers')
    for (var i = idx; i < idx + 3; i++) {
        stickersHTML += `<p class="sticker" onclick="onAddSticker('${gStickers.stickers[i]}')">${gStickers.stickers[i]}</p>`
    }
    stickers.innerHTML = stickersHTML
}

function moveToMoreStickers(direction) {
    if (direction === 'left') {
        if (gStickers.idx - 3 < 0) return
        gStickers.idx -= 3
    } else {
        if (gStickers.idx + 3 > gStickers.stickers.length - 1) return
        gStickers.idx += 3
    }
    renderStickersGallery()
}





