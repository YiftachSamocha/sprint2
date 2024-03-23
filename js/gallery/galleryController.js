'use strict'


function renderGallery() {
    document.querySelector('.gallery').innerHTML = ''
    for (var i = 1; i <= getImgs().length; i++) {
        renderImgGallery(i)
    }
    renderKeywords()
}

function filterGallery(input) {
    document.querySelector('.gallery').innerHTML = ''
    const imgs = getImgs()
    for (var i = 0; i < imgs.length; i++) {
        for (var j = 0; j < imgs[i].keywords.length; j++) {
            if (imgs[i].keywords[j].includes(input)) {
                renderImgGallery(i + 1)
                break

            }
        }
    }

    const datalist = document.querySelectorAll('.filter option')
    for (var i = 0; i < datalist.length; i++) {
        if (input === datalist[i].value) {
            increaseKeyword(input)
            renderKeywords()
            return
        }
    }

}

function renderImgGallery(idx) {
    const gallery = document.querySelector('.gallery')
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    var img = new Image()
    const id = getImgs()[idx - 1].id
    canvas.setAttribute('id', id)


    img.src = 'img/gallery-original/' + idx + '.jpg'

    img.onload = function () {
        var size = Math.min(img.width, img.height)
        canvas.width = gCanvasSize
        canvas.height = gCanvasSize
        var offsetX = (img.width - size) / 2
        var offsetY = (img.height - size) / 2

        ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, canvas.width, canvas.height)
    };
    canvas.addEventListener('click', function () {
        onImgSelect(this.id)
    })

    gallery.appendChild(canvas)
}

function renderKeywords() {
    const elKeywords = document.querySelector('.keywords')
    var keywordsHTML = ``
    const keywordsSizes = Object.values(getKeywordsMap())
    const keywordsWords = Object.keys(getKeywordsMap())


    var keywordsAmount
    if (document.body.classList.contains('keywords-all-opened')) keywordsAmount = keywordsWords.length
    else keywordsAmount = 5

    for (var i = 0; i < keywordsAmount; i++) {
        keywordsHTML += `<p style="font-size: ${keywordsSizes[i] * 0.5}em;" onclick="filterGallery('${keywordsWords[i]}')">${keywordsWords[i]}</p>`
    }
    if (document.body.classList.contains('keywords-all-opened')) {
        keywordsHTML += '<button onclick="toggleKeywords()">Close</button>'

    } else {
        keywordsHTML += '<button onclick="toggleKeywords()">more...</button>'
    }


    elKeywords.innerHTML = keywordsHTML
}

function toggleKeywords() {
    document.body.classList.toggle('keywords-all-opened')
    document.querySelector('.filter').classList.toggle('opened-keywords')
    renderKeywords()
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
    renderStickersGallery()
}

function getImgSizes(idx) {
    const img = new Image()
    img.src = `img/gallery-original/${idx}.jpg`
    const dimensions = { w: img.width, h: img.height }
    img.remove()

    return dimensions
}

function insertKeywordsDataOptions() {
    var optionsHTML = ``
    console.log(getKeywordsMap())

    const options = Object.keys(getKeywordsMap())
    const elOptions = document.querySelector('.filter datalist')
    for (var i = 0; i < options.length; i++) {
        optionsHTML += `<option value="${options[i]}">`
    }
    elOptions.innerHTML = optionsHTML
}


