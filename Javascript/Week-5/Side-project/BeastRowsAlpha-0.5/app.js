const player = document.querySelector(".player");
const monster = document.querySelector(".monster");
const startButton = document.querySelector(".start-button");
const monsterHealth = document.querySelector(".health-bar-fluid");
// Get the modal
const modal = document.getElementById("myModal");
const characters = document.getElementsByName("char");

for (let character of characters) {
  character.addEventListener("click", char);
  // When the user clicks on the Hero, close the modal
  character.onclick = function () {
    modal.style.display = "none";
  }; 
}

function char() {
  let playerDiamonds = parseInt(
    document.getElementById("playerDiamonds").innerHTML
  );
  if (playerDiamonds >= 100) {
    if (this.id == "orc") {
      document.getElementById("selectedChar").innerHTML = 1;
    }

    if (this.id == "princess") {
      document.getElementById("selectedChar").innerHTML = 2;
    }

    if (this.id == "knight") {
      document.getElementById("selectedChar").innerHTML = 3;
    }
    shop();
    console.log("in the if statement");
  } else {
    alert("Not enough diamonds");
  }
}

// Get the button that opens the modal
const btn = document.getElementById("shop_btn");

// Get the <span> element that closes the modal
const span = document.getElementById("close_shop");

let positionFight = 33;
let positionStart = -19;

let newMonsterHealth = 100;
let newRound = 0;
let dps = 20;
let clickDps = 10;
let playerCoins = 0;
let playerDiamonds = 0;
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

const getHero = () => {
  return [
    {
      name: "barbarian",
      heroRun: "https://i.postimg.cc/PxQD96vF/barbarian-1-run.gif",
      heroHit: "https://i.postimg.cc/YCGtNsHH/barbarian-1-attack.gif",
    },
    {
      name: "orc",
      heroRun: "https://i.postimg.cc/RFjv5pYF/orc-1-run.gif",
      heroHit: "https://i.postimg.cc/RF3vYxXy/orc-1-attack2.gif",
    },
    {
      name: "princess",
      heroRun: "https://i.postimg.cc/2yKH8Rwh/princess-run.gif",
      heroHit: "https://i.postimg.cc/8c5KSPhT/princess-attack.gif",
    },
    {
      name: "knight",
      heroRun: "https://i.postimg.cc/ZY7r38dq/soldier-run.gif",
      heroHit: "https://i.postimg.cc/WzHgvVvZ/soldier-attack.gif",
    },
  ];
};
/*start game*/
const startGame = (obj, skin) => {
  console.log(skin);
  let chosenMon = obj;
  transition();
  let maxHpDam = mobHp();
  attackPhase(chosenMon, maxHpDam, skin);
};
const transition = () => {
  startButton.style.display = "none";
  player.style.transition = "all 3s linear";
  monster.style.transition = "all 3s linear";
  player.style.left = `${positionFight}%`;
  monster.style.right = `${positionFight}%`;
};
/*hp calculation */
const mobHp = () => {
  let roundNr = roundCount();
  let newMobHp = 100 * 1.1 ** roundNr;
  HpCalc(newMobHp);
  return newMobHp;
};

const HpCalc = (nextLvlHp) => {
  newMonsterHealth = nextLvlHp;
  let maxMobHealth = newMonsterHealth;

  monsterHealth.style.width = `${(newMonsterHealth / newMonsterHealth) * 100}%`;
  return maxMobHealth;
};

/*attack*/
const clickDamage = () => {
  currentHp = parseInt(document.getElementById("hidden-hp").innerHTML);
  clickerDmg = 50;
  currentHp -= clickerDmg;
  document.getElementById("hidden-hp").innerHTML = `${currentHp}`;
};
const attackPhase = (obj, maxHpDam, skin) => {
  let round = document.getElementById("playerRound").innerHTML;
  let selectedChar = parseInt(
    document.getElementById("selectedChar").innerHTML
  );
  let deadMonster = obj.monsterDead;
  setTimeout(() => {
    console.log(skin[selectedChar].heroHit);
    player.src = skin[selectedChar].heroHit;
    round == 1
      ? (monster.src =
          "https://i.postimg.cc/9fg77P9M/ezgif-com-gif-maker-5.gif")
      : (monster.src = obj.monsterHit);
  }, 3000);
  setTimeout(() => {
    autoDps(
      newMonsterHealth,
      monsterHealth,
      dps,
      deadMonster,
      maxHpDam,
      skin
    );
  }, 2000);
};
const autoDps = (
  healthMon,
  healthBarMon,
  playerDmg,
  deadMonster,
  maxHpDam,
  skin
) => {
  const healthCheck = setInterval(function () {
    let round = document.getElementById("playerRound").innerHTML;
    let selectedChar = parseInt(
      document.getElementById("selectedChar").innerHTML
    );
    if (healthMon <= 0) {
      healthBarMon.style.width = `0%`;
      player.src = skin[selectedChar].heroRun;
      round == 1
        ? (monster.src =
            "https://i.postimg.cc/zBLRSLwk/ezgif-com-gif-maker-4.gif")
        : (monster.src = deadMonster);
      setTimeout(() => {
        monster.style.display = "none";
      }, 1000);
      player.style.left = "100%";
      clearInterval(healthCheck);
      setTimeout(() => {
        resetAll(skin);
      }, 2600);
      addCoins();
      addDiamonds();
    } else {
      let damaged = damage(healthMon, healthBarMon, playerDmg, maxHpDam);
      healthMon = damaged;
    }
  }, 1000);
};
const damage = (healthMon, healthBarMon, playerDmg, maxHpDam) => {
  let maxtest = maxHpDam;
  healthMon -= playerDmg;
  healthBarMon.style.width = `${(healthMon / maxtest) * 100}%`;
  console.log(healthMon);
  document.getElementById("hidden-hp").innerHTML = `${healthMon}`;
  return healthMon;
};
const respawn = (obj) => {
  player.style.transition = "none";
  monster.style.transition = "none";
  monster.style.display = "block";
  player.style.left = `${positionStart}%`;
  monster.style.right = `${positionStart}%`;
  monster.src = obj.monsterRun;
};
const resetAll = (skin) => {
  let run = getRandMon();
  respawn(run);
  setTimeout(() => {
    startGame(run, skin);
  }, 500);
};
const getRandMon = () => {
  const monsters = getMonster();
  randIndex = Math.floor(Math.random() * monsters.length);
  index = monsters[randIndex];
  return index;
};
/*round calculation*/
const roundCount = () => {
  newRound++;
  document.getElementById("playerRound").innerHTML = `${newRound}`;
  return newRound;
};
/*add coins*/
const addCoins = () => {
  let playerCoins = parseInt(document.getElementById("playerCoins").innerHTML);
  playerCoins += Math.floor(Math.random() * 3) + 1;
  document.getElementById("playerCoins").innerHTML = `${playerCoins}`;
};
/*power up*/
const powerUp = () => {
  let playerMoney = parseInt(document.getElementById("playerCoins").innerHTML);
  let powerUpCost = parseInt(document.getElementById("powerUpPrice").innerHTML);
  if (playerMoney >= powerUpCost) {
    playerMoney -= powerUpCost;
    dps += 20;
    powerUpCost++;
    document.getElementById("playerCoins").innerHTML = `${playerMoney}`;
    document.getElementById("powerUpPrice").innerHTML = `${powerUpCost}`;
    console.log("yeah BOY upgrade like crazy");
  } else {
    console.log("You poor bastard, go work for your money");
  }
  return dps;
};
/*add diamond*/
const addDiamonds = () => {
  let playerDiamonds = parseInt(
    document.getElementById("playerDiamonds").innerHTML
  );
  let chance = Math.random();
  if (chance <= 0.1) {
    playerDiamonds += Math.floor(Math.random() * 3) + 1;
    document.getElementById("playerDiamonds").innerHTML = `${playerDiamonds}`;
  }
};
/*shop*/
const shop = () => {
  let playerDiamonds = parseInt(
    document.getElementById("playerDiamonds").innerHTML
  );
  if (playerDiamonds >= 100) {
    playerDiamonds -= 100;
    document.getElementById("playerDiamonds").innerHTML = `${playerDiamonds}`;
  } else {
    console.log("You can't pay for that you poor fool");
  }
};

startButton.addEventListener("click", () => {
  let getMons = getRandMon();
  let hero = getHero();
  startGame(getMons, hero);
});

// ========= POP-UP VENSTER ===========

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function getRich() {
  let playerDiamonds = parseInt(
    document.getElementById("playerDiamonds").innerHTML
  );
  playerDiamonds += 100;
  document.getElementById("playerDiamonds").innerHTML = `${playerDiamonds}`;
}
