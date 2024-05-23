export function generateCoordinates(
    canvasWidth,
    canvasHeight,
    padding,
    numberOfPoints
) {
    let coordinates = []
    let legalPoints = 0
    while (legalPoints < numberOfPoints) {
        const point = {
            x: generateN(padding, canvasWidth - padding),
            y: generateN(padding, canvasHeight - padding)
        }
        if (collides(coordinates, point) === false) {
            coordinates.push(point)
            legalPoints += 1
        }
    }
    return {xs: coordinates.map(p => p.x), ys: coordinates.map(p => p.y)}
};

function generateN(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function collides(coordinates, point){
    for (const coord of coordinates){
        if(Math.sqrt((coord.x - point.x)**2 + (coord.y - point.y)**2) < 30){
            return true
        }
    }
    return false
}