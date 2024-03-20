'use strict'
const IMAGES_TITLE = 'Images'
var gImgs = getFromStorage(IMAGES_TITLE) || createImgs()

function getImgs() {
    return gImgs
}

function setImgs(images) {
    gImgs = images
}

function createImgs() {
    var imgs = []
    for (var i = 1; i <= 18; i++) {
        const img = {
            id: 'id-' + i,
            url: `img/gallery-original/${i}.jpg`,
            keywords: [],
            width: getImgSizes(i).w,
            height: getImgSizes(i).h,

        }
        imgs.push(img)
    }
    saveToStorage(IMAGES_TITLE, imgs)
    return imgs
}
function addSizes(w, h, imgIdx) {
    gImgs[imgIdx].width = w
    gImgs[imgIdx].height = h
}

function getSizes(imgIdx) {
    const w = gImgs[imgIdx].width
    const h = gImgs[imgIdx].height
    return { w: w, h: h }
}