'use strict'
var gSavedMemes = []
function renderSavedMemes() {
    const memes = getFromStorage('Saved Memes')

    const saved = document.querySelector('.saved-memes')
    if (memes === null) {
        saved.innerHTML = `<p>There are no saved memes. Go and create one!</p>`
        return
    }
    saved.innerHTML = ''
    for (var i = 0; i < memes.length; i++) {
        const canvas = document.createElement('canvas')
        canvas.classList.add('meme', memes[i].canvasId)
        canvas.setAttribute('id', memes[i].canvasId)
        canvas.onclick = onMemeSelect
        saved.appendChild(canvas)
        setEditedMeme(memes[i])
        renderMeme()
    }
    clearEditor()
}

function onMemeSelect() {
    editSavedMeme(this.id)
}

function editSavedMeme(memeId) {
    const meme = getMemeById(memeId)
    setEditedMeme(meme)
    setCanvasId('main')
    selectLine(0)
    setIsFramed(true)
    renderMeme()
    
    renderStickersGallery()
    removeMeme(memeId)
    showSection('editor')
}
