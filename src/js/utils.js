function calculateDomSize(scalSize, domSize) {
    var result = {
        width: domSize.width * scalSize + 'px',
        height: domSize.height * scalSize + 'px',
        top: domSize.top * scalSize + 'px',
        left: domSize.left * scalSize + 'px'
    }
}