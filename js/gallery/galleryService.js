'use strict'
const IMAGES_TITLE = 'Images'
var gImgs = getFromStorage(IMAGES_TITLE) || createImgs()
var gKeywordMap = setKeywordsMap()

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
            keywords: insertKeyWords(i),
            width: getImgSizes(i).w,
            height: getImgSizes(i).h,

        }
        imgs.push(img)
    }
    saveToStorage(IMAGES_TITLE, imgs)
    return imgs
}

function insertKeyWords(imgIdx) {
    var keywords
    switch (imgIdx) {
        case 1:
            keywords = ['evil', 'president']
            break
        case 2:
            keywords = ['sweet', 'animal']
            break
        case 3:
            keywords = ['sweet', 'animal', 'baby']
            break
        case 4:
            keywords = ['sweet', 'animal']
            break
        case 5:
            keywords = ['baby', 'funny', 'angry']
            break
        case 6:
            keywords = ['funny',  'uniqe']
            break
        case 7:
            keywords = ['baby', 'suprize']
            break
        case 8:
            keywords = ['surprize', 'happy']
            break
        case 9:
            keywords = ['baby', 'happy', 'evil']
            break
        case 10:
            keywords = ['happy', 'president']
            break
        case 11:
            keywords = ['fight', 'happy']
            break
        case 12:
            keywords = ['israeli',  'uniqe']
            break
        case 13:
            keywords = ['happy', 'movie']
            break
        case 14:
            keywords = ['movie',  'suprize']
            break
        case 15:
            keywords = ['movie', 'fight']
            break
        case 16:
            keywords = ['evil',  'happy']
            break
        case 17:
            keywords = ['president',]
            break
        case 18:
            keywords = ['movie', ]
            break
    }
    return keywords
}

function setKeywordsMap() {
    gKeywordMap = {}
    for (var i = 0; i < gImgs.length; i++) {
        for (var j = 0; j < gImgs[i].keywords.length; j++) {
            if (gKeywordMap.hasOwnProperty(gImgs[i].keywords[j])) continue
            gKeywordMap[gImgs[i].keywords[j]] = 1
        }

    }
}

function getKeywordsMap() {
    if (!gKeywordMap) setKeywordsMap()
    return gKeywordMap
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

function increaseKeyword(keyword) {
    gKeywordMap[keyword]++
}