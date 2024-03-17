'use strict'
var gImgs = getFromStorage('Images') || [
    { id: createId(), url: 'img/asi.jpg', keywords: [] },
    { id: createId(), url: 'img/boy.jpg', keywords: [] },
    { id: createId(), url: 'img/cat.jpg', keywords: [] },
    { id: createId(), url: 'img/dance.jpg', keywords: [] },
    { id: createId(), url: 'img/danit.jpg', keywords: [] },
    { id: createId(), url: 'img/morpheus.jpg', keywords: [] },
    { id: createId(), url: 'img/opera.jpg', keywords: [] },
    { id: createId(), url: 'img/philosoraptor.jpg', keywords: [] },
]

function getImgs() {
    return gImgs
}

function setImgs(images) {
    gImgs = images
}