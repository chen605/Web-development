const input = document.getElementById('number');
const btn = document.getElementById('btn');
const span = document.getElementById('label');

btn.addEventListener('click', checkNumber)

// function checkNumber(){
//   if(input.value == 3){
//     span.innerHTML = 'Het ingevoerde getal is gelijk aan 3'
//   }
//   if(input.value >= 4){
//     span.innerHTML = 'Het ingevoerde getal is groter of gelijk aan 4'
//   }
//   if(input.value >= 11){
//     span.innerHTML = 'Het ingevoerde getal is gelijk aan 11 of groter dan 11';
//   }
//   if(input.value < 3){
//     span.innerHTML = 'Het ingevoerde getal is kleiner dan 3'
//   }
//   if (!input.value){
//     span.innerHTML = '';
//   }
// }

function checkNumber(){
  if(input.value > 5 && input.value < 10){
    span.innerHTML = 'Het ingevoerde getal is tussen 5 en 10';
  }
  else if(input.value >= 11 && input.value <= 20){
    span.innerHTML = 'Het ingevoerde getal is gelijk aan 11 of groter dan 11 en is gelijk aan 20 of kleiner dan 20'
  }
  else if(input.value == 21 || input.value == 23){
    span.innerHTML = 'Het ingevoerde getal is gelijk aan 21 of is gelijk aan 23'
  }
  else if(input.value > 30 && input.value < 35 || input.value > 40 && input.value < 45){
    span.innerHTML = 'Het getal is tussen 30 en 35 of het getal is tussen 40 en 45'
  }
}

// OPDRACHT 13 en 14

function checkNumber(){
  switch (parseInt(input.value)) {
    case 1:
      span.innerHTML = "January";
      break;
    case 2:
      span.innerHTML = "February";
      break;
    case 3:
      span.innerHTML = "March";
      break;
    case 4:
      span.innerHTML = "April";
      break;
    case 5:
      span.innerHTML = "May";
      break;
    case 6:
      span.innerHTML = "June";
      break;
    case 7:
      span.innerHTML = "July";
      break;
    case 8:
      span.innerHTML = "August";
      break;
    case 9:
      span.innerHTML = "September";
      break;
    case 10:
      span.innerHTML = "October";
      break;
    case 11:
      span.innerHTML = "November";
      break;
    case 12:
      span.innerHTML = "December";
      break;
  }
}