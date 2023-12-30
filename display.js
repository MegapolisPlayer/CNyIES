//countdown

//language updates

let Headers = [
    "Veselé Vánoce a Štastný Nový Rok",
	"Merry Christmas and a Happy New Year",
	"С Новым Годом и Счастливого Рождества",
	"Fröhe Weihnachten und eines gutes neues Jahr",
	"Błogosławionych Świąt Bożego Narodzenia i Wspanialego Nowego Roku"
]; 
let Count = [
    "Odpočet",
	"Countdown",
	"Отсчет",
	"Countdown",
	"Odliczanie"
];  
let Music = [
	"Hudba",
	"Music",
	"Музыка",
	"Musik",
	"Muzyka"
]; 
         
let LangId = 0;
         
function ChangeHeader() {
	LangId++;
	if(LangId == Headers.length) { LangId = 0; }
	document.getElementById("header").innerHTML = Headers[LangId];
	document.getElementById("countname").innerHTML = Count[LangId];
	document.getElementById("musicname").innerHTML = Music[LangId];
}
const HeaderChangeInterval = setInterval(ChangeHeader, 2000);
         
function Init() {
	DateUpdate();
	document.getElementById("header").innerHTML = Headers[0];
	document.getElementById("countname").innerHTML = Count[0];
	document.getElementById("musicname").innerHTML = Music[0];
}