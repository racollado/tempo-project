// global const for how many songs from the database are in use
export const itemCount = 100;

// for use in generating matchups without immediate collision
export const generateUniqueRandomInt = (id1, id2) => {
    var rand = 0;
    do {
      rand = Math.floor((Math.random() * itemCount) + 1)
    } while (rand === id1 || rand === id2)
    return rand;
  }

// for use in generating random emotion param values (1 - 100)
export const generateEmotionValue = () => {
  return Math.floor((Math.random() * 100) + 1);
}

  // for use in controlling bounce animation
export const sleep = ms => new Promise(r => setTimeout(r, ms));