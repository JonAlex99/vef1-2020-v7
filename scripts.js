/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {
  let input = prompt('Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“');
  let inputN;
  let sesarString;
  if(input.toLocaleUpperCase('is-IS') === 'KÓÐA'){
    inputN = erNGilt();
    sesarString = erSesarGilt(input, inputN);
    alert(encode(sesarString, inputN));

  } else if(input.toLocaleUpperCase('is-IS') === 'AFKÓÐA'){
    inputN = erNGilt();
    sesarString = erSesarGilt(input, inputN);
    alert(decode(sesarString, inputN));

  } else {
    alert('Veit ekki hvaða aðgerð ' + input + ' er. Reyndu aftur.');
    start();
  }

}

function erNGilt(){
  let inputN = prompt('Hversu mikið á að hliðra strenginn? Gefðu upp heiltölu á bilinu [1, 31]');
  if(inputN < 32 && inputN > 0){
    return parseInt(inputN);
  } else {
    alert('Veit ekki hvaða aðgerð "' + inputN + '" er. Reyndu aftur.');
    erNGilt();
  }
}

function erSesarGilt(input, inputN){
  let svar = prompt('Gefðu upp strenginn sem á að ' + input + ' með hliðrun ' + inputN);
  let vit = erEkkiISL(svar.toLocaleUpperCase('is-IS'));
  if(svar === ''){
    alert('Þú gafst ekki upp streng. Reyndu aftur!');
    erSesarGilt(input,inputN);
  } else if (vit.length){
    alert('Þú gafst upp stafi sem ekki er hægt að ' + input + ': ' + '\'' + vit.join(', ') + '\'');
    erSesarGilt(input,inputN);
  } else {
    return svar.toLocaleUpperCase('is-IS');
  }
}


function erEkkiISL(str){
  var skil = [];
  for(let i = 0; i < str.length; i++){
    if(LETTERS.indexOf(str[i]) === -1){
      skil.push(str[i]);
    }
  }
  return skil;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  let temp = '';
  for(let i = 0; i < str.length; i++){
    temp += LETTERS[mod((LETTERS.indexOf(str[i]) + n),32)];
  }
  return temp;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  let temp = '';
  for(let i = 0; i < str.length; i++){
    temp += LETTERS[mod((LETTERS.indexOf(str[i]) - n),32)];
  }
  return temp;
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
