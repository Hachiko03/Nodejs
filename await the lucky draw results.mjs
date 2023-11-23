function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

async function getResults(players) {
  for (const player of players)
    try {
      const resultado = await luckyDraw(player);
      console.log(resultado);
    } catch (err) {
      console.error(err);
    }
}

const players = ["Tina", "Jorge", "Julien"];

getResults(players)