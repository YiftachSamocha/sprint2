'use strict'

function renderGallery() {
    const imgs = getImgs()
    setImgs(imgs)
    const gallery = document.querySelector('.gallery')
    var galleryHTML = ''
    for (var i = 0; i < imgs.length; i++) {
        galleryHTML += `<div class="image"> <img src="${imgs[i].url}" id="${imgs[i].id}" onclick="onImgSelect(this.id)"></div>`
    }
    gallery.innerHTML = galleryHTML
    
}

function onImgSelect(imageId) {
    setImg(imageId)
    setCanvasId('main')
    addLine()
    const editor = document.querySelector('.meme.main')
    setLocation(editor.width / 2, editor.height / 5 + SIZE / 2)
    renderMeme()
    showSection('editor')
}
