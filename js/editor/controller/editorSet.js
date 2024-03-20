'use strict'

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
    gElCanvas.removeEventListener('click', makeClickableFrame)
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