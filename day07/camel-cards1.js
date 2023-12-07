const fs = require('fs');

// Part 1

const file = fs.readFileSync('input.txt', 'utf-8').split('\n')
const data = {}
const ranked = []

file.forEach(line => {
    let [cards, bid] = line.split(' ')
    data[cards] = bid
})

// compare two sets of cards to find which one ranks higher (returns 1 for first and 2 for second)
const compare = (hand1, hand2) => {
    const type1 = get_type(hand1)
    const type2 = get_type(hand2)

    if(type1 !== type2) return type1 > type2 ? 1 : 2 // if they are not the same type return the better one

    for(let i = 0; i < hand1.length; i++){
        let res = compare_2_cards(hand1[i], hand2[i])

        if(res !== 0) return res
    }

    return -1 // should be impossible but this is if two cards are the same
}

const card_values = {2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, T: 10, J: 11, Q: 12, K: 13, A: 14}

// Compares two cards returns 0 if same, 1 if card 1 bigger and 2 if card 2 bigger
const compare_2_cards = (card1, card2) => {
    if(card1 == card2) return 0
    return card_values[card1] > card_values[card2] ? 1 : 2
}

// returns the type: 0 = highcard, 1 = 1 pair, 2 = 2 pair, ... , 5 = 4 of a kind, 6 = 5 of a kind
const get_type = (hand) => {
    const counts = {}
    for(let i = 0; i < hand.length; i++){
        counts[hand[i]] ? counts[hand[i]] += 1 : counts[hand[i]] = 1
    }
    
    const sorted = Object.values(counts).sort((a, b) => b - a);
    switch(sorted[0]){
        case 5:
            return 6
        case 4:
            return 5
        case 3:  // determine between 3 pair and full house
            return sorted[1] === 2 ? 4 : 3
        case 2: // determine between 1 pair and 2 pair
            return sorted[1] === 2 ? 2 : 1
        case 1:
            return 0
    }
}

// rank hands
const hands = Object.keys(data)

hands.forEach(hand => {
    if(ranked.length === 0){
        ranked.push(hand)
    } else if (ranked.length === 1){
        if(compare(ranked[0], hand) === 1) ranked.unshift(hand)
        else ranked.push(hand)
    }else {
        //console.log(hand)
        for(let i = 0; i < ranked.length; i++){
            //console.log('i = ' + i)
            let res = compare(ranked[i], hand) 
            //console.log('res = ' + res)
            if(res === 1){ // found the hand ranked one higher so add it behind
                //console.log('Adding ' + hand)
                ranked.splice(i, 0, hand)
                i = ranked.length
            }else{
                if(i === ranked.length - 1){
                    ranked.push(hand)
                    i = ranked.length
                }
            }
        }
    }
})

console.log(ranked.length)
// get score
let total = 0
for(let i = 1; i <= ranked.length; i++){
    total += (i * Number(data[ranked[i-1]]))
}

console.log('Part1: ' + total)