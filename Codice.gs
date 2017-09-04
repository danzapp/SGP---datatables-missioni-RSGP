function getScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
}

function doGet() {

  return HtmlService
      .createTemplateFromFile('Index')
      .evaluate(); 
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

// *****************  LEGGE I DATI DALLO SHEET E RESTITUISCE UN OBJECT  *************

function readData(){

var dataMissioni = sheet.getDataRange().getValues()

// rimuove riga 2 e 3
dataMissioni.splice(1,2)


var currentUser = Session.getActiveUser().getEmail()
// Logger.log(currentUser)

// modifica il formato della data di rilevazione
var dataObjectsArray = ObjApp.rangeToObjectsNoCamel(dataMissioni) //Object con un Array di Objects



//Logger.log(dataObjectsArray)

for (var i in dataObjectsArray){
  Logger.log(i + ' - ' + dataObjectsArray[i]['Regione'])
}



// ---------------------------------------------
// controllo ruolo utente: viewer, editor, owner  

dataObjectsArray.forEach(function(obj){ 

  if(currentUser == obj['Indirizzo email']){
    obj.Ruolo = "Editor" ; 
  }
  else
  {
    obj.Ruolo = "Viewer"; 
  }
  
  Logger.log(obj['Ufficio Territoriale'])
  
})

Logger.log(JSON.stringify(dataObjectsArray))

// ---------------------------------------------
  
var mainObject = {  // quando completa l'array di Object costruisce l'oggetto Contenitore
      user: currentUser,
      table: dataObjectsArray,
    };

 // Logger.log(mainObject);
 // return mainObject  // il risultato viene restituito come Object 
 return JSON.stringify(mainObject) // il risultato viene restituito come JSON e sarà necesario effettuare JSON.parse()
}


