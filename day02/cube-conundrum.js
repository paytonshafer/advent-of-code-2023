const fs = require('fs');

// Part 1
const data = fs.readFileSync('input.txt', 'utf-8')
const lines = data.split('\n')

let sum1 = 0

lines.forEach((line) => {
    let game_id = line.split(':')[0].split(' ')[1]
    let sets = line.split(': ')[1].split('; ')
    let possible = true

    sets.forEach((set) => {
        let elems = set.split(', ') 
        
        elems.forEach((elem) => {
            let [ num, color ] = elem.split(' ')

            switch (color){
                case 'red':
                    if(Number(num) > 12) possible = false
                    break
                case 'green':
                    if(Number(num) > 13) possible = false
                    break

                case 'blue':
                    if(Number(num) > 14) possible = false
                    break
            }
        })
    })

    if(possible) sum1 += Number(game_id) 
})

console.log('Part1: ' + sum1)

// Part 2
let sum2 = 0

lines.forEach((line) => {
    let game_id = line.split(':')[0].split(' ')[1]
    let sets = line.split(': ')[1].split('; ')
    let red_min = 0
    let green_min = 0
    let blue_min = 0

    sets.forEach((set) => {
        let elems = set.split(', ') 
        
        elems.forEach((elem) => {
            let [ num, color ] = elem.split(' ')

            switch (color){
                case 'red':
                    if(Number(num) > red_min) red_min = Number(num)
                    break
                case 'green':
                    if(Number(num) > green_min) green_min = Number(num)
                    break

                case 'blue':
                    if(Number(num) > blue_min) blue_min = Number(num)
                    break
            }
        })
    })

    sum2 += red_min * green_min * blue_min
})

console.log('Part2: ' + sum2)