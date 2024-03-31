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
    if (document.querySelector('.text input').value === 'Enter Text!') document.querySelector('.text input').value = ''
}

function onAddLine() {
    addLine()
    selectLine(getLinesLength() - 1)
    const elCanvas = document.querySelector('.meme.main')
    if (getLinesLength() === 1) {
        setLocation(elCanvas.width / 2, elCanvas.height / 5 + SIZE / 2)
    } else if (getLinesLength() === 2) {
        setLocation(elCanvas / 2, (elCanvas.height / 5) * 5 - SIZE)
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

function onSetLocation(x, y) {
    setLocation(x, y)
    renderMeme()
}

function onAddSticker(sticker) {
    addLine()
    selectLine(getLinesLength() - 1)
    onSetText(sticker)
    renderMeme()
    document.querySelector('.text input').value = sticker
}

function onDownload(elLink) {
    clearImgToExport()

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

function onFacebook() {
    clearImgToExport()
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg")

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    doUploadImg(imgDataUrl, onSuccess)
    showSection('gallery')
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append("img", imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return
        const { responseText: url } = XHR
        onSuccess(url)
    }
    XHR.open("POST", "//ca-upload.com/here/upload.php")
    XHR.send(formData)
}

function clearImgToExport() {
    setIsFramed(false)
    selectLine(0)
    while (getEditedMeme().lines.length !== 0 && getEditedMeme().selectedLineIdx !== getLinesLength()) {
        if (getLine().txt === 'Enter Text!') {
            deleteLine()
        } else {
            selectLine(getEditedMeme().selectedLineIdx + 1)
        }
    }
    renderMeme()
}