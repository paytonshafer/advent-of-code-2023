const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8')
const lines = data.split('\n')

// Part 1
let total_1 = 0

lines.forEach((line) => {
    winning_nums = line.split(' |')[0].split(':')[1].trim().split(' ').filter(i => i !== '')
    my_nums = line.split('| ')[1].split(' ').filter(i => i !== '')

    let score = 0
    
    my_nums.forEach((num) => {
        if(winning_nums.includes(num)){
            score === 0 ? score = 1 : score = score * 2
        }
    })

    total_1 += score
})

console.log('Part1: ' + total_1)


// Part 2
copies = {}
curr_card = 1

lines.forEach((line) => {
    winning_nums = line.split(' |')[0].split(':')[1].trim().split(' ').filter(i => i !== '')
    my_nums = line.split('| ')[1].split(' ').filter(i => i !== '')

    next_card = curr_card + 1

    my_nums.forEach((num) => {
        if(winning_nums.includes(num)){
            copies[next_card] ? copies[next_card] = copies[next_card] + 1 : copies[next_card] = 1
            next_card += 1
        }
    })
    
    if(copies[curr_card]){
        for(let i = 0; i < copies[curr_card]; i++){
            next_card = curr_card + 1
            my_nums.forEach((num) => {
                if(winning_nums.includes(num)){
                    copies[next_card] ? copies[next_card] = copies[next_card] + 1 : copies[next_card] = 1
                    next_card += 1
                }
            })
        }
    }
    curr_card += 1
})

// sum up cards
let total_cards = Object.values(copies).reduce((accumulator, currentValue) => accumulator + currentValue, 0) + 208

console.log('Part2: ' + total_cards)