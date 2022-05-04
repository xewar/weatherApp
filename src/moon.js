import { format, addDays, compareAsc } from 'date-fns';

let moonPhases = (() => {
  //retrieves data from icalendar37.net
  let loadMoonPhases = async (moonObj, date) => {
    var gets = [];
    for (var i in moonObj) {
      gets.push(i + '=' + moonObj[i]);
    }
    gets.push('LDZ=' + new Date(moonObj.year, moonObj.month - 1, 1) / 1000);
    try {
      let response = await fetch(
        'https://www.icalendar37.net/lunar/api/?' + gets.join('&'),
        { mode: 'cors' }
      );
      let responseJSON = await response.json();
      return responseJSON.phase[date.getDate()].svg;
    } catch (error) {
      console.log(error);
    }
  };
  let addMoonToDOM = (moonPhase, index) => {
    let dayDiv = document.getElementById(`day${index}`);
    let containMoon = dayDiv.children[0];
    containMoon.innerHTML = moonPhase;
    containMoon.firstChild.firstChild.children[2].remove();
  };
  let renderMoons = () => {
    let today = new Date();
    //currently a loop of 5 api calls as an easy way to account for the end of the month
    //could be changed to only call this month and next
    for (let i = 0; i < 5; i++) {
      let date = addDays(today, i);
      let configMoon = {
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        size: 50,
        lightColor: 'rgba(255, 72, 176, .4)',
        lightColor: 'rgba(0, 131, 138, .4)',
        lightColor: 'rgba(61, 85, 136, .2)',

        shadeColor: 'rgba(255,255,255,0)', //transparent
        texturize: false,
      };
      //loads the phase for that date and adds it to the DOM
      loadMoonPhases(configMoon, date, i).then(moonPhase =>
        addMoonToDOM(moonPhase, i)
      );
    }
  };
  return { renderMoons };
})();

export default moonPhases;
