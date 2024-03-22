'use strict'


function renderGallery() {
    for (var i = 1; i <= getImgs().length; i++) {
        renderImgGallery(i)
    }
}

function renderImgGallery(idx) {
    const gallery = document.querySelector('.gallery')
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    var img = new Image()
    const id = getImgs()[idx-1].id
    canvas.setAttribute('id', id)
    

    img.src = 'img/gallery-original/' + idx + '.jpg'

    img.onload = function () {
        var size = Math.min(img.width, img.height)
        canvas.width = gCanvasSize
        canvas.height= gCanvasSize
        var offsetX = (img.width - size) / 2
        var offsetY = (img.height - size) / 2

        ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, canvas.width, canvas.height)
    };
    canvas.addEventListener('click', function () {
        onImgSelect(this.id)
    })
   
    gallery.appendChild(canvas)
}


function onImgSelect(imageId) {
    clearEditor()
    setImg(imageId)
    setCanvasId('main')
    onAddLine()
    onAddLine()
    selectLine(0)
    renderMeme()
    showSection('editor')
}

function getImgSizes(idx) {
    const img = new Image()
    img.src = `img/gallery-original/${idx}.jpg`
    const dimensions = { w: img.width, h: img.height }
    img.remove()

    return dimensions
}
