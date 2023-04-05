const itemCount = 447;

export const generateUniqueRandomInt = (id1) => {
    var rand = 0;
    do {
      rand = Math.floor((Math.random() * itemCount) + 1)
    } while (rand === id1)
    return rand;
  }

export const sleep = ms => new Promise(r => setTimeout(r, ms));