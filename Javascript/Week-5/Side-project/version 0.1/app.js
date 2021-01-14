// const roundNr = document.getElementById("playerRound").innerHTML;
const player = document.querySelector(".player");
const monster = document.querySelector(".monster");
const startButton = document.querySelector(".start-button");
const monsterHealth = document.querySelector(".health-bar-fluid");
let newMonsterHealth = 100;
let newRound = 0;
let dps = 20;
let clickDps = 10;
const getMonster = () => {
  // Monster animations.
  return [
    {
      name: "monster1",
      monsterRun: "https://i.postimg.cc/9MvwxWJH/ezgif-com-gif-maker-6.gif",
      monsterHit: "https://i.postimg.cc/9fg77P9M/ezgif-com-gif-maker-5.gif",
      monsterDead: "https://i.postimg.cc/zBLRSLwk/ezgif-com-gif-maker-4.gif",
    },
    {
      name: "monster2",
      monsterRun: "https://i.postimg.cc/HLWB4th1/ezgif-com-gif-maker-9.gif",
      monsterHit: "https://i.postimg.cc/vZsPDy7B/ezgif-com-gif-maker-8.gif",
      monsterDead: "https://i.postimg.cc/K8D0MWQ5/ezgif-com-gif-maker-7.gif",
    },
    {
      name: "monster3",
      monsterRun: "https://i.postimg.cc/Dfc0RdCM/ezgif-com-gif-maker-18.gif",
      monsterHit: "https://i.postimg.cc/wTTMzyZT/ezgif-com-gif-maker-17.gif",
      monsterDead: "https://i.postimg.cc/m2XDgZW3/ezgif-com-gif-maker-16.gif",
    },
  ];
};

const powerUp = () => {
  dps++;
  return dps;
}

const startGame = (obj) => {
  let chosenMon = obj;
  let nextLvlHp = mobHp();
  newMonsterHealth = nextLvlHp;
  monsterHealth.style.width = `${newMonsterHealth}%`;
  transition();
  attackPhase(chosenMon);
};

const transition = () =>{
  startButton.style.display = "none";
  player.style.transition = "all 3s linear";
  monster.style.transition = "all 3s linear";
  player.style.left = "33%";
  monster.style.right = "33%";
}

const attackPhase = (obj)=>{
  let round = document.getElementById("playerRound").innerHTML;
  let deadMonster = obj.monsterDead
  console.log(round)
  setTimeout(() => {
    player.src = "https://i.postimg.cc/YCGtNsHH/barbarian-1-attack.gif";
    round == 1 ? monster.src = "https://i.postimg.cc/9fg77P9M/ezgif-com-gif-maker-5.gif" : monster.src = obj.monsterHit;
  }, 3000);
  setTimeout(() => {
    autoDps(newMonsterHealth, monsterHealth, dps, obj, deadMonster, round);
  }, 2000);
};

const autoDps = (healthMon, healthBarMon, playerDmg, obj, deadMonster, round) => {
  const healthCheck = setInterval(function () {
    console.log(`dps: ${healthMon}`);
    console.log(round)
    if (healthMon <= 0) {
      healthBarMon.style.width = `0%`;
      player.src = "https://i.postimg.cc/PxQD96vF/barbarian-1-run.gif";
      round == 1 ? monster.src = "https://i.postimg.cc/zBLRSLwk/ezgif-com-gif-maker-4.gif" : monster.src = deadMonster;
      setTimeout(() => {
        monster.style.display = "none";
      }, 1000);
      player.style.left = "100%";
      clearInterval(healthCheck);
      setTimeout(() => {
        resetAll(healthMon, healthBarMon, obj);
      }, 2600);
    } else {
      let damaged = damage(healthMon, healthBarMon, playerDmg);
      healthMon = damaged;
    }
  }, 1000);
};

const damage = (healthMon, healthBarMon, playerDmg) => {
  healthMon -= playerDmg;
  healthBarMon.style.width = `${healthMon}%`;
  return healthMon;
};

const respawn = (obj) => {
  player.style.transition = "none";
  monster.style.transition = "none";
  monster.style.display = "block";
  player.style.left = "-17%";
  monster.style.right = "-17%";
  monster.src = obj.monsterRun;
};

const resetAll = () => {
  let run = getRandMon();
  respawn(run);
  setTimeout(() => {
    startGame(run);
  }, 500);
};

const getRandMon = () => {
  const monsters = getMonster();
  randIndex = Math.floor(Math.random() * monsters.length)
  index = monsters[randIndex];
  return index;
};

const roundCount = () => {
  newRound++;
  document.getElementById("playerRound").innerHTML = `${newRound}`;
  console.log(newRound);
  return newRound;
};

const mobHp = () => {
  let roundNr = roundCount();
  let newMobHp = 100 * 1.1 ** roundNr;
  console.log(newMobHp);
  return newMobHp;
};

startButton.addEventListener("click", () => {
  let getMons = getRandMon();
  startGame(getMons);
});