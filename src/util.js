const itemCount = 100;

export const generateUniqueRandomInt = (id1, id2) => {
    var rand = 0;
    do {
      rand = Math.floor((Math.random() * itemCount) + 1)
    } while (rand === id1 || rand === id2)
    return rand;
  }

export const sleep = ms => new Promise(r => setTimeout(r, ms));