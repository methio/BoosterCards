/* ############################################################################################
                                    VARIABLES GLOBALES
#############################################################################################*/

let SheetIndex = 1;
let url = 'https://spreadsheets.google.com/feeds/list/1hJmH_-bgyaAXR2u2xeR-N_gT9iKIXIjU02YK17dhrU8/'+SheetIndex+'/public/basic?alt=json';

let currentCardSet = [];
let generatedCardsSet = [];
let generatedCardsSetIndex = 1;
let generatedCardMemory = document.getElementById("generatedCardMemoryContainer");

let clearDataButton = document.getElementById('clearDataButton');
let generateCardButton = document.getElementById('generateCardButton');
let loadNewSheetButton = document.getElementById('loadNewSheetButton');


/* ############################################################################################
                                    FONCTIONS PRINCIPALES
#############################################################################################*/

function generateCard(){
  $.getJSON(url,function(data){  
    currentCardSet = []; // on vide le tableau des 3 cartes courantes

    //################### 1 -> Sélection des cartes ################### 
    for(let i = 0; i < 3; i++){
      let index = getRandomInt(1, data.feed.entry.length);    
      let d = data.feed.entry[index].content.$t
        .split(/,+ /)
        .map(field=>field.split(/:+ /));
      let selectedalue = d[i][1];
      currentCardSet.push(selectedalue); // on ajoute les trois cartes au tableau des cartes courantes         
    }
    generatedCardsSet.push(currentCardSet); // on pousse les cartes courantes dans la mémoire


    //################# 2 -> Affichage des cartes tirées ##################     
    let cardContainer = document.getElementById("generatedCardContainer");       

    document.getElementById("firstCard").innerHTML = currentCardSet[0];
    document.getElementById("secondCard").innerHTML = currentCardSet[1];
    document.getElementById("thirdCard").innerHTML = currentCardSet[2]; //on affiche les trois cartes courantes dans trois paragraphes

    cardContainer.style.display = "flex"; // on modifie certains éléments css 
    clearDataButton.style.display = "flex";
    generateCardButton.style.padding = ".5em 2em";
    generateCardButton.style.width = "auto";


    // #### 3 -> Ajout des cartes tirées au tableau des cartes générées ###
    let cardTag = [];
    let cardText = [];

    let lI = document.createElement("ul"); // on affiche l'index du tirage pour afficher les cartes en mémoire
    let lC = document.createTextNode("Tirage " + generatedCardsSetIndex); 
    lI.appendChild(lC);
    generatedCardMemory.appendChild(lI);      

    for(let i = 0; i < 3; i++){
      cardTag[i] = document.createElement("ul");
      cardText[i] = document.createTextNode(currentCardSet[i]);
      cardTag[i].appendChild(cardText[i]);

      generatedCardMemory.appendChild(cardTag[i]); // on affiche affiche les cartes en mémoire
    }
    
    generatedCardsSetIndex += 1;
  });
}

function clearGeneratedCardsSet(){
  //vider le tableau qui garde en mémoire les anciens tirages
  generatedCardsSet = [];
  //vider la liste qui affiche les anciens tirages
  generatedCardMemory.innerHTML = '';
  //réinitialiser l'index des tirages
  generatedCardsSetIndex = 1;
}

function loadNewSheet(){
  // récupérer l'index de la feuille à afficher
  SheetIndex = document.getElementById('sheet').value;   
  // reconstruire l'url   
  url = 'https://spreadsheets.google.com/feeds/list/1hJmH_-bgyaAXR2u2xeR-N_gT9iKIXIjU02YK17dhrU8/'+SheetIndex+'/public/basic?alt=json';
}  


/* ############################################################################################
                                    BUTTONS ACTIONS
#############################################################################################*/

generateCardButton.addEventListener('click', generateCard);   
clearDataButton.addEventListener('click', clearGeneratedCardsSet);
loadNewSheetButton.addEventListener('click', loadNewSheet);


/* ############################################################################################
                                    FONCTIONS UTILES
#############################################################################################*/

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
