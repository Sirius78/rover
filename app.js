// Rover Object Goes Here
let rover = {
        direction: "N",
        x: 0,
        y: 0,
        travelLog: []
    },
    gridLenght = 10,
    grid = [],
    bombs = 10;

/**
 * We checked to see if the rover's coordinates hit a bomb
 * 
 * @param rover 
 */
function hasBomb(rover) {
    for (let i = 0; i < grid.length; i++) {
        if (rover.x === grid[i][0] && rover.y === grid[i][1]) {
            return true;
        }
    }
    return false;
}

/**
 * We turn the rover to the left
 * 
 * @param rover 
 */
function turnLeft(rover) {
    //se mueve contrario a las agujas del reloj
    switch (rover.direction) {
        case "N":
            rover.direction = "W";
            break;
        case "W":
            rover.direction = "S";
            break;
        case "S":
            rover.direction = "E";
            break;
        case "E":
            rover.direction = "N";
            break;
    }

    return rover;
}

/**
 * We turn the rover to the right
 * 
 * @param rover 
 */
function turnRight(rover) {
    //se mueve segun las agujas del reloj
    switch (rover.direction) {
        case "N":
            rover.direction = "E";
            break;
        case "E":
            rover.direction = "S";
            break;
        case "S":
            rover.direction = "W";
            break;
        case "W":
            rover.direction = "N";
            break;
    }

    return rover;
}

/**
 * We turn the rover forward
 * 
 * @param rover 
 */
function moveForward(rover) {
    //eje x horizaontal eje y vertical
    switch (rover.direction) {
        case "N":
            rover.y = rover.y - 1 < 0 ? 0 : rover.y - 1;
            break;
        case "E":
            rover.x = rover.x + 1 > gridLenght ? gridLenght : rover.x + 1;
            break;
        case "S":
            rover.y = rover.y + 1 > gridLenght ? gridLenght : rover.y + 1;
            break;
        case "W":
            rover.x = rover.x - 1 < 0 ? 0 : rover.x - 1;
            break;
    }

    return rover;
}


/**
 * We turn the rover back
 * 
 * @param {*} rover 
 */
function moveBackwards(rover) {
    //eje x horizaontal eje y vertical
    switch (rover.direction) {
        case "N":
            rover.y = rover.y + 1 > gridLenght ? gridLenght : rover.y + 1;
            break;
        case "E":
            rover.x = rover.x - 1 > 0 ? 0 : rover.x - 1;
            break;
        case "S":
            rover.y = rover.y - 1 < 0 ? 0 : rover.y - 1;
            break;
        case "W":
            rover.x = rover.x + 1 < gridLenght ? gridLenght : rover.x + 1;
            break;
    }
}

/**
 * Execute the trip with the programmed coordinates
 * 
 * @param rover 
 * @param cadena 
 */
function command(rover, cadena) {
    for (let i = 0; i < cadena.length; i++) {
        let validDirection = true;

        switch (cadena[i]) {
            case "f":
                rover = moveForward(rover);
                break;
            case "r":
                rover = turnRight(rover);
                break;
            case "l":
                rover = turnLeft(rover);
                break;
            case "b":
                rover = moveBackwards(rover);
                break;
            default:
                validDirection = false;
                console.log("Entrada incorrecta solo l r f b");
        }

        let exploded = hasBomb(rover);

        if (validDirection) {
            rover.travelLog.push({
                x: rover.x,
                y: rover.y,
                direction: rover.direction,
                exploded: exploded
            });
        }
    }
}

/**
 * We generate bombs in random coordinates
 */
for (let i = 1; i < bombs; i++) {
    grid.push([
        Math.floor(Math.random() * gridLenght),
        Math.floor(Math.random() * gridLenght)
    ]);
}

command(rover, "rffrfflfrff");


for (let i = 0; i < rover.travelLog.length - 1; i++) {
    console.log(
        "Current X: " + rover.travelLog[i].x + " | Y: " + rover.travelLog[i].y + " | Direction: " + rover.travelLog[i].direction + " | Exploded: " + rover.travelLog[i].exploded
    );
}

console.log(grid);
