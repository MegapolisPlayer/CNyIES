//language updates

let HeadersShort = [
    "VNrIZ",
    "CNyIES",
    "РНгИРС",
    "IESWNj",
    "BNrSIR"
]; 

let Headers = [
    "Vánoční a Novoroční informarční a zábavný systém",
    "Christmas and New Year Information and Entertainment System",
    "Рождественско-новогодняя информационно-развлекательная система",
    "Informations- und Entertainment-System für Weihnachten und Neujahr",
    "Bożonarodzeniowy i Noworoczny System Informacyjno-Rozrywkowy"
]; 
    
let LangId = 0;
    
function ChangeHeader() {
    LangId++;
	if(LangId == Headers.length) { LangId = 0; }
	document.getElementById("header").innerHTML = HeadersShort[LangId];
	document.getElementById("headerp").innerHTML = Headers[LangId];
}
const HeaderChangeInterval = setInterval(ChangeHeader, 2000);
    
function Init() {
	document.getElementById("header").innerHTML = HeadersShort[0];
    document.getElementById("headerp").innerHTML = Headers[0];
}