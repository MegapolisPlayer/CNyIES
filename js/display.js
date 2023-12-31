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

function DrawCenteredText(Text, X, Y) {
	TextSize = CanvasC.measureText(Text);
	let ActualTextHeight = TextSize.actualBoundingBoxAscent + TextSize.actualBoundingBoxDescent;
	CanvasC.fillText(Text, X - (TextSize.width/2), Y + (ActualTextHeight/2));
}

//also draws text i guess
function DrawTimezoneBounds() {
	ClearCanvas();
	DrawWorldMap();

	for(let i = 0; i < 25; i++) {
		//variables

		let NewYearTime = new Date(DateNow.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
		NewYearTime.setHours(NewYearTime.getHours() - (NewYearTime.getTimezoneOffset() / 60) - (i-12)); //convert to UTC
		let TimeUntilNewYear = (NewYearTime - DateNow) / 1000;
		let TimeUntilNewYearH = Math.floor(TimeUntilNewYear / 3600); //convert to hours
		let TimeUntilNewYearM = Math.floor((TimeUntilNewYear % 3600) / 60); //convert to minutes (remove hours)

		//TimeUntilNewYear = -5 - (i-12); //DEBUG ONLY, left here because why not 

		if(!(TimeUntilNewYearH > 1 && TimeUntilNewYearH <= 24)) {
			//timezone transparent boxes

			if(TimeUntilNewYearH <= 0) {
				SetCanvasColor("#00ff00");
			}
			else if(TimeUntilNewYearH == 1) {
				SetCanvasColor("#ffff00");
			}
			else if(TimeUntilNewYearH > 24) {
				SetCanvasColor("#ffffff");
			}
			else {}

			CanvasC.globalAlpha = 0.2;
			let WidthOfBox = 100/24;
			if(i == 0) { WidthOfBox = 100/48; } //narrower so no overlap, not needed on last
			CanvasC.fillRect(GetPercentage(i*(100/24)-(100/48), Canvas.width), 0, GetPercentage(WidthOfBox, Canvas.width), Canvas.height);
			CanvasC.globalAlpha = 1;
		}

		if(!(i == 0 || i == 24)) {
			//time until new year text

			if(TimeUntilNewYearH <= 0) {
				SetCanvasColor("#cccccc");
			}
			else if(TimeUntilNewYearH == 1) {
				SetCanvasColor("#cc6600");
			}
			else if(TimeUntilNewYearH <= 12) {
				SetCanvasColor("#009900");
			}
			else if(TimeUntilNewYearH <= 24) {
				SetCanvasColor("#00dd00");
			}
			else {
				SetCanvasColor("#cccccc");
			}
			let TimeUntilNewYearText = String(TimeUntilNewYearH) + ":" + String(TimeUntilNewYearM);
			DrawCenteredText(TimeUntilNewYearText, GetPercentage((i*(100/24)), Canvas.width), Canvas.height*0.8);

			//timezone no. text

			SetCanvasColor("#ffffff");
			let TextToDraw = String(i-12);
			if(TextToDraw == "0") { TextToDraw = "GMT"; }
			if(Number(TextToDraw) >= 1) { TextToDraw = "+" + TextToDraw; }
			DrawCenteredText(TextToDraw, GetPercentage((i*(100/24)), Canvas.width), Canvas.height*0.75);
		}

		//line
		SetCanvasColor("#ffffff");
		CanvasC.beginPath();
		CanvasC.moveTo(GetPercentage(i*(100/24)+(100/48), Canvas.width), 0);
		CanvasC.lineTo(GetPercentage(i*(100/24)+(100/48), Canvas.width), Canvas.height);
		CanvasC.stroke();
	}
}

const MapUpdateInterval = setInterval(DrawTimezoneBounds, 5000); //every 5 seconds

//countdown

//forcechanges: forces changes after new year, DEBUG ONLY
let DEBUG_ForceChanges = false;

function DecreaseCountdown() {
	let MsCount = (new Date(DateNow.getFullYear() + 1, 0, 1, 0, 0, 0, 0) - DateNow) / 1000; //to seconds (original in MS)

	//new year passed - 1st or 2nd of January - GREY countdown
	if((DateNow.getDate() <= 2 && DateNow.getMonth == 0) || DEBUG_ForceChanges) {
		document.getElementById("maincount").style = "filter: brightness(30%);";
	}

	document.getElementById("maincount").innerHTML = 
		String(Math.floor(MsCount / 86400)).padStart(2, '0') + ":" +
		String(Math.floor((MsCount % 86400) / 3600)).padStart(2, '0') + ":" +
		String(Math.floor((MsCount % 86400 % 3600) / 60)).padStart(2, '0') + ":" +
		String(Math.floor(MsCount % 86400 % 3600 % 60)).padStart(2, '0')
		;

	//new year passed - 1st or 2nd of January - append the year
	if((DateNow.getDate() <= 2 && DateNow.getMonth == 0) || DEBUG_ForceChanges) {
		document.getElementById("maincount").innerHTML += (", (" + String(DateNow.getFullYear() + 1) + ")");
	}
}

const CountdownUpdateInterval = setInterval(DecreaseCountdown, 500); //less to potentially catch up

//init

function InitWebD() {
	GetStyleCookies();

	Canvas = document.getElementById("tzcanvas");
	Canvas.width = WorldImage.naturalWidth;
	Canvas.height = WorldImage.naturalHeight;
	CanvasC = Canvas.getContext("2d");
	CanvasC.lineWidth = 5;
	CanvasC.font = "38px Open Sans";
	//CanvasC.globalAlpha = 1;
	CanDraw = true;

	document.getElementById("header").innerHTML = Headers[0];
	document.getElementById("countname").innerHTML = Count[0];

	document.getElementById("musicname").innerHTML = Music[0];
	document.getElementById("tzmapname").innerHTML = TzMap[0];

	document.getElementById("countdowndesc").innerHTML = CountdownDescs[0];

	DrawWorldMap();
	DrawTimezoneBounds();
}