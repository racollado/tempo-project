import { getAllItems } from "./get.js";

export async function generateNormalizedScores() {
    
    // get all items
    const items = await getAllItems();
    
    // set up scores array, keep track of min and max from each emotion
    let scores = [];
    let maxH = 0;
    let minH = 100;
    let maxA = 0;
    let minA = 100;
    let maxC = 0;
    let minC = 100;

    // iterate through items
    // SCORE FORMULA = wins / matchups, then deduct 5% for each skip
    items.forEach((item) => {
        const idx = item['id'];
        
        const hw = item['happy_wins']
        const hs = item['happy_skips']
        const hm = item['happy_matchups']
        
        const aw = item['angry_wins']
        const as = item['angry_skips']
        const am = item['angry_matchups']
        
        const cw = item['chill_wins']
        const cs = item['chill_skips']
        const cm = item['chill_matchups']

        // happy
        let hScore = (hw * 100 / hm) * Math.pow(0.95, hs)
        if (hScore > maxH) {
            maxH = hScore
        }
        if (hScore < minH) {
            minH = hScore
        }

        // angry
        let aScore = (aw * 100 / am) * Math.pow(0.95, as)
        if (aScore > maxA) {
            maxA = aScore
        }
        if (aScore < minA) {
            minA = aScore
        }
        
        // chill
        let cScore = (cw * 100 / cm) * Math.pow(0.95, cs)
        if (cScore > maxC) {
            maxC = cScore
        }
        if (cScore < minC) {
            minC = cScore
        }

        // SONGS ARE 0-INDEXED HERE (to avoid empty first item), 
        // but the accurate id is stored in the array
        scores[idx - 1] = [idx, hScore, aScore, cScore]
    })

    // normalize scores so that the lowest score is 0 and the highest is 100
    const normalizedScores = scores.map((scoreSet) => [
        scoreSet[0],
        (scoreSet[1] - minH) * (100 / (maxH - minH)),
        (scoreSet[2] - minA) * (100 / (maxA - minA)),
        (scoreSet[3] - minC) * (100 / (maxC - minC))
    ])

    return normalizedScores;
}

export async function getTotalResponses() {
    
    // get all items
    const items = await getAllItems();
    let totalResponses = 0;

    items.forEach((song) => {
        totalResponses += song['happy_matchups'] + song['angry_matchups'] + song['chill_matchups']
    })

    return totalResponses;
}

export function distance(params, scoreSet) {
    const hSquared = Math.pow((params[0] - scoreSet[1]), 2)
    const aSquared = Math.pow((params[1] - scoreSet[2]), 2)
    const cSquared = Math.pow((params[2] - scoreSet[3]), 2)
    return Math.sqrt(hSquared + aSquared + cSquared);
}