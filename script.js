
let SheetIndex = 1;
let url = 'https://spreadsheets.google.com/feeds/list/1hJmH_-bgyaAXR2u2xeR-N_gT9iKIXIjU02YK17dhrU8/'+SheetIndex+'/public/basic?alt=json';

// global var
let generatedCardsSet = [];
let generatedCardsSetIndex = 1;
let generatedCardMemory = document.getElementById("generatedCardMemoryContainer");


      
    function generateCard(){
      $.getJSON(url,function(data){
      
        let dataHandler = [];      

        //############### Sélection des cartes ############### 
        for(let i = 0; i < 3; i++){
          let index = getRandomInt(1, data.feed.entry.length);
        
          let d = data.feed.entry[index].content.$t
            .split(/,+ /)
            .map(field=>field.split(/:+ /));

          let selectedalue = d[i][1];
          dataHandler.push(selectedalue);

          // console.log("index : " + index + ", item : " + selectedalue);        
        }
        generatedCardsSet.push(dataHandler);
        console.log(generatedCardsSet);

        //############### Affichage des cartes tirées ###############     
        let cardContainer = document.getElementById("generatedCardContainer");       

        document.getElementById("firstCard").innerHTML = dataHandler[0];
        document.getElementById("secondCard").innerHTML = dataHandler[1];
        document.getElementById("thirdCard").innerHTML = dataHandler[2];

        cardContainer.style.display = "block";

        // ############### Ajout des cartes tirées au tableau des cartes générées ###############
        let cardTag = [];
        let cardText = [];

        let lI = document.createElement("li");
        let lC = document.createTextNode("index du tirage : " + generatedCardsSetIndex); 
        lI.appendChild(lC);
        generatedCardMemory.appendChild(lI);      

        for(let i = 0; i < 3; i++){
          cardTag[i] = document.createElement("li");
          cardText[i] = document.createTextNode(dataHandler[i]);
          cardTag[i].appendChild(cardText[i]);

          generatedCardMemory.appendChild(cardTag[i]);
        }
        
        generatedCardsSetIndex += 1;
      });
    }

    function clearGeneratedCardsSet(){
      //empty the array
      generatedCardsSet = [];
      //remove li elements created    
      generatedCardMemory.innerHTML = '';
      //reset index of generated set 
      generatedCardsSetIndex = 1;
    }

    function loadNewSheet(){
      SheetIndex = document.getElementById('sheet').value;      
      url = 'https://spreadsheets.google.com/feeds/list/1hJmH_-bgyaAXR2u2xeR-N_gT9iKIXIjU02YK17dhrU8/'+SheetIndex+'/public/basic?alt=json';

      console.log(url);
    }

    

//detect click on buttons
let generateCardButton = document.getElementById('generateCardButton');
generateCardButton.addEventListener('click', generateCard);   

let clearDataButton = document.getElementById('clearDataButton');
clearDataButton.addEventListener('click', clearGeneratedCardsSet);

let loadNewSheetButton = document.getElementById('loadNewSheetButton');
loadNewSheetButton.addEventListener('click', loadNewSheet);


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
