//language updates

let Headers = [
    "Veselé Vánoce a Štastný Nový Rok",
	"Merry Christmas and a Happy New Year",
	"С Новым Годом и Счастливого Рождества",
	"Fröhe Weihnachten und eines gutes neues Jahr",
	"Błogosławionych Świąt Bożego Narodzenia i Wspanialego Nowego Roku"
]; 
let Count = [
    "Odpočet do Nového Roku",
	"Countdown to the New Year",
	"Отсчет до Нового года",
	"Neujahr-Countdown",
	"Odliczanie do Nowego Roku"
];  

let Music = [
	"Hudba",
	"Music",
	"Музыка",
	"Musik",
	"Muzyka"
]; 
let TzMap = [
    "Mapa časových pásem",
    "Map of Timezones",
    "Карта часовых поясов",
    "Karte der Zeitzonen",
    "Mapa stref czasowych"
]; 

let CountdownDescs = [
    "Den:Hodina:Minuta:Sekunda",
    "Day:Hour:Minute:Second",
    "День:Час:Минута:Секунда",
    "Tag:Stunde:Minute:Sekunde",
    "Dzień:Godzina:Minuta:Sekunda"
]; 
         
let LangId = 0;
         
function ChangeHeader() {
	LangId++;
	if(LangId == Headers.length) { LangId = 0; }
	document.getElementById("header").innerHTML = Headers[LangId];
	document.getElementById("countname").innerHTML = Count[LangId];

	document.getElementById("musicname").innerHTML = Music[LangId];
	document.getElementById("tzmapname").innerHTML = TzMap[LangId];

	document.getElementById("countdowndesc").innerHTML = CountdownDescs[LangId];
}
const HeaderChangeInterval = setInterval(ChangeHeader, 2000);
     
//timezone map

let Canvas = {};
let CanvasC = {};
let CanDraw = false;

let WorldImage = new Image();
WorldImage.src = "assets/bluemarble.png";

function DrawWorldMap() {
	if(!CanDraw) { window.setTimeout(DrawWorldMap, 100); }
	CanvasC.drawImage(WorldImage, 0, 0, WorldImage.width, WorldImage.height, 0, 0, Canvas.width, Canvas.height);
}

function GetPercentage(Percentage, Maximum) {
	if(Percentage > 100 || Percentage < 0) { return -1 };
	return Percentage*(Maximum/100)
}

function SetCanvasColor(ColorHex) {
	CanvasC.fillStyle = ColorHex;
	CanvasC.strokeStyle = ColorHex;
}

function ClearCanvas() {
	CanvasC.fillRect(0, 0, Canvas.width, Canvas.height);
}

function DrawTimezoneBounds() {
	SetCanvasColor("#bbbbbb");
	for(let i = 0; i < 24; i++) {
		CanvasC.beginPath();
		CanvasC.moveTo(i*GetPercentage(5, Canvas.width), 0);
		CanvasC.lineTo(i*GetPercentage(5, Canvas.width), Canvas.height);
		CanvasC.stroke();
	}
}

//countdown

function DecreaseCountdown() {
	let MsCount = (new Date(new Date().getFullYear() + 1, 0, 1, 0, 0, 0, 0) - DateNow) / 1000; //to seconds (original in MS)

	//new year passed - 1st or 2nd of January - GREY countdown
	if(new Date().getDate() <= 2 && new Date().getMonth == 0) {
		document.getElementById("maincount").style = "#aaaaaa";
	}

	document.getElementById("maincount").innerHTML = 
		String(Math.floor(MsCount / 86400)).padStart(2, '0') + ":" +
		String(Math.floor((MsCount % 86400) / 3600)).padStart(2, '0') + ":" +
		String(Math.floor((MsCount % 86400 % 3600) / 60)).padStart(2, '0') + ":" +
		String(Math.floor(MsCount % 86400 % 3600 % 60)).padStart(2, '0')
		;
}

const CountdownUpdateInterval = setInterval(DecreaseCountdown, 500); //less to potentially catch up

//init

function InitWebD() {
	GetStyleCookies();

	Canvas = document.getElementById("tzcanvas");
	Canvas.width = WorldImage.naturalWidth;
	Canvas.height = WorldImage.naturalHeight;
	CanvasC = Canvas.getContext("2d");
	CanvasC.lineWidth = 10;
	CanDraw = true;

	document.getElementById("header").innerHTML = Headers[0];
	document.getElementById("countname").innerHTML = Count[0];

	document.getElementById("musicname").innerHTML = Music[0];
	document.getElementById("tzmapname").innerHTML = TzMap[0];

	document.getElementById("countdowndesc").innerHTML = CountdownDescs[0];

	DrawWorldMap();
	DrawTimezoneBounds();
}