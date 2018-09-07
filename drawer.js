let target;
let popSize;
let mutationRate;
let population;

let generationNumber;
let completionStatement;

let buttonClicked;

let buttonHolder;
let sliderHolder;
let sliderHolder2;

let holderholder;

let counter = 0;

let genCount;
let mutateCount;

let slider1Temp;
let slider2Temp;


function setup() {

  genCount = createP('testing').id('gentext').parent('gen-values');

  mutateCount = createP('testing').id('muttext').parent('mutation-values');

  sliderHolder = createSlider(5, 1000,61).id('gen').parent('slidercontainer1');
  sliderHolder2 = createSlider(0, 100, 5).id('mutation').parent('slidercontainer2');

  buttonClicked = false;

  //60 because wen we created the first slider, we set it at 60 first... just easier n more expliciy
  slider1Temp = 60;
  slider2Temp = .05;

  setupTextObjects();

  createCanvas(windowWidth, windowHeight);
  frameRate(40);

  buttonHolder.mousePressed(buttonCLICKED);

  resetPopulation();
}

function draw() {

  if(slider1Temp < sliderHolder.value() || slider1Temp > sliderHolder.value()){
    genCount.remove();
    genCount = createP(sliderHolder.value()).id('gentext').parent('gen-values');
    slider1Temp = sliderHolder.value();
  }

  if(slider2Temp < sliderHolder2.value() || slider2Temp > sliderHolder2.value() ){
    mutateCount.remove();
    mutateCount = createP(sliderHolder2.value() / 100).id('muttext').parent('mutation-values');
    slider2Temp = sliderHolder2.value();
  }

  
// console.log(popSize);
// console.log(mutationRate);
// console.log("-----------");


  // console.log(sliderHolder.value());
  // console.log(sliderHolder2.value() / 100);
  // console.log("---------------------")

  //A NASTY WAY TO UPDATE OUR DIV WITH A NEW P ELEMENT THAT HOLDS THE NEW GEN NUM
  //WE REMOVE THE PAST P ELEMENT, AND MAKE A NEW ONE WITH THE SAME LINES; BUT THE .GETGEN
  //METHOD WILL PROVIDE A NEW COUNT NOW
  if(buttonClicked){
    //the hardest fucking part for getting this shit to reset... finally found sum gud logic.
    //when buttonisclicked, we check if we ran something previously with the counter... if its not 1, we
    //havent dont anything previously, so we will move on

    //if it becomes 1, that means we need to create a NEW POPULATION and then reset the counter!
    //and also reset the completion statement
    if(counter > 0){
      completionStatement.remove();
      resetPopulation();
      counter = 0;
    }

    //constantly updating the text displaying wot gen we are currently on
    generationNumber.remove();
    generationNumber = createP("GENERATION: " + population.getGen()).parent('generations').style('margin', '0px').style('padding', '0px');

    background(99, 110, 114);

    // Generate mating pool
    population.createMatingPool();
    //Create next generation
    population.generate();
    // Calculates fitness of most recent gen
    population.calcFitness();
    population.findBest();

    // If we found the target phrase, stop loop
    if (population.isFinished()){
      buttonClicked = false;
      counter++;
      
      // displays completion statement once best match is reached
      //gens start from 0 and up!!!
      completionStatement = createP("FOUND IN GEN-" + (population.getGen() - 1)).parent('completion-statement').style('margin', '0px').style('padding', '0px');

    }

    //Displays best match rainbow out of our current gen
    noStroke();
    displayInfo();
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//used for showing the actual rainbow we see on the screen
///////////////////////////////////////////////////////////////////////////////////////////////////

function displayInfo() {

  //THe means in which we display the best match chromosome out of the current generation
  let answer = population.getBest().getGene();

  let newY = 100;
  let statstext;
  let x;
  for(let i = 0; i < target.length; i++){
      x = answer[i];
      newY+=30;
      if(x == 1){
        fill(58, 227, 116);
        statstext+= rect(0,newY, width, 30);
      }else if(x == 2){
        fill(23, 192, 235);
        statstext+= rect(0,newY, width, 30);
      }else if(x == 3){
        fill(255, 159, 26);
        statstext+= rect(0,newY, width, 30);
      }else if(x == 4){
        fill(255, 242, 0);
        statstext+= rect(0,newY, width, 30);
      }else if(x == 5){
        fill(113, 88, 226);
        statstext+= rect(0,newY, width, 30);
      }else if(x == 6){
        fill(255, 56, 56);
        statstext+= rect(0,newY, width, 30);
      }
  }
}

//sets up button and prompt in beginning
function setupTextObjects(){
  buttonHolder = createButton("START").style('height', '100px').style('background', 'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)').style('border','5px double black').style('font-weight', 'bold').parent('button-holder');
  generationNumber = createP("specify your population size and mutation rate!").style('margin', '0px').style('padding', '0px').parent('generations');
}


//sets up our target and our NEW popSize and mutation Rate
function resetPopulation(){
  
// console.log((document.getElementsByClassName('gen')[0]));
  target = [6, 3, 4, 1, 2, 5, 5, 2, 1, 4, 3, 6];//WHOA, QUADRUPLE RAINBOW!!!
  popSize = sliderHolder.value();  //inc pop size for better variation; dont inc too much!
  mutationRate = (sliderHolder2.value() / 100); //relatively low mutation rate is fine; dont make it too high, dont make it too low


  
  // Create a population with a target array, mutation rate, and population size
  population = new popTester(target, mutationRate, popSize);
}


//checks if the button I made is clicked
function buttonCLICKED(){
  buttonClicked = true;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//need to have method for resizing rainbow on screen...
///////////////////////////////////////////////////////////////////////////////////////////////////