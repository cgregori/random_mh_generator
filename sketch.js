/*******************************************************************************
********************************************************************************
 EXAMPLE ENUMS 
********************************************************************************
********************************************************************************

const enumValue = (name) => Object.freeze({toString: () => name});

const Colors = Object.freeze({
    RED: enumValue("Colors.RED"),
    BLUE: enumValue("Colors.BLUE"),
    GREEN: enumValue("Colors.GREEN")
});

********************************************************************************
********************************************************************************
*******************************************************************************/

// Function for serialization to MongoDB
// TODO(me): implement
const enumValue = (name) => Object.freeze({toString: () => name});

// Equal to 1/14
BASE_ODDS = 0.07142857142

class Weapons {
  constructor(builder) {
    this.name = builder.name;
    this.odds = builder.odds;
  } 

  /**
   * Print out every property and its value in the object.
   */
  debug() {
    Object.keys(this).forEach(property => {
      console.log(`${property}: ${this[property]}`);
    });
  }
}

class WeaponsBuilder {

  constructor() {
    this.name = ''
    this.odds = BASE_ODDS
  }

  setName(name) {
    this.name = name;
    return this; //Allow method chaining
  }

  setOdds(odds) {
    this.odds = odds;
    return this; // Allow method chaining
  }

  build() {
    return new Weapons(this);
  }
}

// Corresponds to weapons (14 total)
let sliders = [];

let allWeapons = [
  new WeaponsBuilder().setName('Great Sword').build(),
  new WeaponsBuilder().setName('Long Sword').build(),
  new WeaponsBuilder().setName('Sword and Shield').build(),
  new WeaponsBuilder().setName('Dual Blades').build(),
  new WeaponsBuilder().setName('Hammer').build(),
  new WeaponsBuilder().setName('Hunting Horn').build(),
  new WeaponsBuilder().setName('Lance').build(),
  new WeaponsBuilder().setName('Gunlance').build(),
  new WeaponsBuilder().setName('Switch Axe').build(),
  new WeaponsBuilder().setName('Charge Blade').build(),
  new WeaponsBuilder().setName('Insect Glaive').build(),
  new WeaponsBuilder().setName('Light Bowgun').build(),
  new WeaponsBuilder().setName('Heavy Bowgun').build(),
  new WeaponsBuilder().setName('Bow').build()
];

weaponChosen = 'Roll A Weapon';

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Construct Sliders & Text Boxes
  offset = 20;
  textSize(20);
  for (i = 0; i < allWeapons.length; i++) {
    slider = createSlider(0, 1, BASE_ODDS, 0.01);
    slider.position(10, offset);
    slider.size(80);
    sliders.push(slider);
    // text("hello", 80, offset);
    offset += 30;
  }


  // Roll Functionality
  let rollButton = createButton('Roll Weapon');
  rollButton.position(10, offset+20);
  // Use a callback function to call 'roll()' with arguments.
  rollButton.mousePressed(() => {
    weaponName = roll(allWeapons);
    displayWeapon(weaponName);
  }); 

  // Reset Functionality
  let resetOddsButton = createButton('Reset Odds');
  resetOddsButton.position(10, offset+60);
  resetOddsButton.mousePressed(resetOdds);

}

function mapNumRange(num, inMin, inMax, outMin, outMax) {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Reset Odds and sliders
 */
function resetOdds() {
  for (i = 0; i < allWeapons.length; i++) {
    allWeapons[i].odds = BASE_ODDS;
    sliders[i].value(BASE_ODDS);
  }
}

/**
 * Bar Chart
 */
function displayOdds(){
  offset = 30;
  for (i = 0; i < allWeapons.length; i++) {
    odds = allWeapons[i].odds
    oddsOffset = 0.05;

    // Color Logic
    if (odds < (BASE_ODDS - oddsOffset)) {
      sliderRed = map(odds, 0, 1, 127, 255);
      sliderGreen = 0;
    }
    else if (odds >= BASE_ODDS && odds <= .66) {
      sliderRed = map(odds, 0, 1, 127, 255);
      sliderGreen = map(odds, 0, 1, 158, 255);
    }
    else {
      sliderRed = map(odds, 0, 1, 255, 0);
      sliderGreen = map(odds, 0, 1, 127, 255);
    }



    width = mapNumRange(odds, 0, 1, 30, 200);
    fill(color(sliderRed, sliderGreen, 0));
    bar = rect(300, offset, width, 15);
    offset += 30;
  }
}

function displaySliderText() {
  offset = 36;
  for (i = 0; i < allWeapons.length; i++) {
    textSize(20);
    fill('Black');
    text(allWeapons[i].name, 100, offset);
    offset += 30;
  }
}

function displayWeapon(weaponName) {
  textSize(50);
  fill('Black');
  weaponChosen = weaponName;
  text(weaponName, 125, 500);
}

/**
 * Takes the slider values and updates the weapon odds accordingly.
 */
function updateOdds(weapons) {
  for (i = 0; i < weapons.length; i++) {
    weapons[i].odds = sliders[i].value();
  }
}

/**
 * Take the odds of the weapons and choose a random weapon
 */
function roll(weapons) {
  const totalWeight = weapons.reduce((soFar, weapon) => soFar + weapon.odds, 0)
  const rng = Math.random() * totalWeight;
  let curWeight = 0;
  
  for (const weapon of weapons) {
    curWeight += weapon.odds
    if (curWeight >= rng) {
      return weapon.name
    }
  }
}

function DEBUGALL() {
  // // WEAPON DEBUGGING:
  // for (let weapon of allWeapons) {
  //   weapon.debug()
  // }
  // // RNG DEBUGGING:
  // const rollCounts = {};
  // for (let i = 0; i< 10000; i++) {
  //   const weapon = roll(allWeapons)
  //   if (!rollCounts[weapon]) {
  //     rollCounts[weapon] = 0
  //   }
  //   rollCounts[weapon]++;
  // }
  // console.table(rollCounts);
}

function draw() {
  // DEBUGALL();

  background('#ccb0ff');

  displaySliderText();
  updateOdds(allWeapons);
  displayOdds();
  displayWeapon(weaponChosen);
}