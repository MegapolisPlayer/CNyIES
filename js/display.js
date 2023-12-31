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

//debug stuff again (shows the state of the map when N hours are remaining IN YOUR TIME ZONE)
let DEBUG_OverrideHour = false;
let DEBUG_VALUE_HourOverrideValue = 0;

//also draws text i guess
function DrawTimezoneBounds() {
	ClearCanvas();
	DrawWorldMap();

	for(let i = 0; i < 25; i++) {
		//variables


		let NewYearTime;
		if((DateNow.getDate() <= 2 && DateNow.getMonth() == 0) || DEBUG_ForceChanges) {
			NewYearTime = new Date(DateNow.getFullYear(), 0, 1, 0, 0, 0, 0);
		}
		else {
			NewYearTime = new Date(DateNow.getFullYear() + 1, 0, 1, 0, 0, 0, 0);
		}
		NewYearTime.setHours(NewYearTime.getHours() - (NewYearTime.getTimezoneOffset() / 60) - (i-12)); //convert to UTC
		let TimeUntilNewYear = (NewYearTime - DateNow) / 1000;
		let TimeUntilNewYearH = Math.floor(TimeUntilNewYear / 3600); //convert to hours
		let TimeUntilNewYearM = Math.floor((TimeUntilNewYear % 3600) / 60); //convert to minutes (remove hours)

		if(DEBUG_OverrideHour) {
			TimeUntilNewYear = ((NewYearTime - DateNow) / 1000) - (DEBUG_VALUE_HourOverrideValue*3600);
			TimeUntilNewYearH = Math.floor(TimeUntilNewYear / 3600); //convert to hours
			TimeUntilNewYearM = Math.floor((TimeUntilNewYear % 3600) / 60); //convert to minutes (remove hours)
		}

		if(!((TimeUntilNewYearH > 0 && TimeUntilNewYearH <= 24) || (TimeUntilNewYearH > 99))) {
			//timezone transparent boxes

			if(TimeUntilNewYearH < 0) {
				SetCanvasColor("#00ff00");
			}
			else if(TimeUntilNewYearH == 0) {
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

			if(TimeUntilNewYearH < 0) {
				SetCanvasColor("#cccccc");
			}
			else if(TimeUntilNewYearH == 0) {
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
			let TimeUntilNewYearText;
			if(TimeUntilNewYearH >= 0 && (TimeUntilNewYearH <= 99)) {
				TimeUntilNewYearText = String(TimeUntilNewYearH).padStart(2, '0') + ":" + String(TimeUntilNewYearM).padStart(2, '0');
			}
			else if(TimeUntilNewYearH <= 0) {
				TimeUntilNewYearText = String(Math.abs(TimeUntilNewYearH + 1)).padStart(2, '0') + ":" + String(Math.abs(TimeUntilNewYearM)).padStart(2, '0');
			}
			else {
				TimeUntilNewYearText = ">99:00";
			}
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

const MapUpdateInterval = setInterval(DrawTimezoneBounds, 2500); //every 2.5 seconds

//countdown

//forcechanges: forces changes after new year, DEBUG ONLY
let DEBUG_ForceChanges = false;

function DecreaseCountdown() {
	let MsCount = (new Date(DateNow.getFullYear() + 1, 0, 1, 0, 0, 0, 0) - DateNow) / 1000; //to seconds (original in MS)

	//new year passed - 1st or 2nd of January - GREY countdown
	if((DateNow.getDate() <= 2 && DateNow.getMonth() == 0) || DEBUG_ForceChanges) {
		document.getElementById("maincount").style = "filter: brightness(30%);";
	}

	document.getElementById("maincount").innerHTML = 
		String(Math.floor(MsCount / 86400)).padStart(2, '0') + ":" +
		String(Math.floor((MsCount % 86400) / 3600)).padStart(2, '0') + ":" +
		String(Math.floor((MsCount % 86400 % 3600) / 60)).padStart(2, '0') + ":" +
		String(Math.floor(MsCount % 86400 % 3600 % 60)).padStart(2, '0')
		;

	//new year passed - 1st or 2nd of January - append the year
	if((DateNow.getDate() <= 2 && DateNow.getMonth() == 0) || DEBUG_ForceChanges) {
		document.getElementById("maincount").innerHTML += (", (" + String(DateNow.getFullYear() + 1) + ")");
	}
}

const CountdownUpdateInterval = setInterval(DecreaseCountdown, 500); //less to potentially catch up

//snowflakes

let SnowflakeCanvas;
let SnowflakeCanvasC;
let Snowflakes = new Array();
let SnowflakeInterval;
let SnowflakesAmount = 2500;

function SnowflakeUpdate() {
	SnowflakeCanvasC.fillStyle = document.querySelector(":root").style.getPropertyValue("--mainbgcolor");
	SnowflakeCanvasC.strokeStyle = SnowflakeCanvasC.fillStyle;
	SnowflakeCanvasC.fillRect(0, 0, SnowflakeCanvas.width, SnowflakeCanvas.height);

	let RGBValue = document.querySelector(":root").style.getPropertyValue("--mainfgcolor");
	let RVA = RGBValue.slice(RGBValue.indexOf("(") + 1, RGBValue.indexOf(")")).split(","); 

	//darken a bit
	for(let i = 0; i < RVA.length; i++) {
		RVA[i] = String(Math.floor(Number(RVA[i])/2));
	}
	
	SnowflakeCanvasC.fillStyle = "rgb("+RVA[0]+","+RVA[1]+","+RVA[2]+")";
	SnowflakeCanvasC.strokeStyle = SnowflakeCanvasC.fillStyle;

	for(let i = 0; i < SnowflakesAmount; i++) {
		//general direction
		Snowflakes[i].X += 0.1;
		Snowflakes[i].Y += 0.3;

		//some randomness
		Snowflakes[i].X += (Math.random()-0.5)/8;
		Snowflakes[i].Y += (Math.random()-0.5)/8;

		if(Snowflakes[i].Y >= SnowflakeCanvas.height - 5) {
			Snowflakes[i].Y = 0;
		}
		if(Snowflakes[i].X >= SnowflakeCanvas.width - 5) {
			Snowflakes[i].X = 0;
		}

		SnowflakeCanvasC.beginPath();
		SnowflakeCanvasC.arc(Snowflakes[i].X, Snowflakes[i].Y, 5, 0, Math.PI * 2);
		SnowflakeCanvasC.fill();
	}
}

function SnowflakeInit() {
	SnowflakeCanvas = document.getElementById("snowflakescreen");
	SnowflakeCanvas.width = window.screen.availWidth;
	SnowflakeCanvas.height = window.screen.availHeight;
	SnowflakeCanvasC = SnowflakeCanvas.getContext("2d");

	SnowflakeCanvasC.lineWidth = 1;

	SnowflakeCanvasC.fillStyle = document.querySelector(":root").style.getPropertyValue("--mainbgcolor");
	SnowflakeCanvasC.strokeStyle = SnowflakeCanvasC.fillStyle;
	SnowflakeCanvasC.fillRect(0, 0, SnowflakeCanvas.width, SnowflakeCanvas.height);

	for(let i = 0; i < SnowflakesAmount; i++) {
		Snowflakes.push({
			X: Math.random()*window.screen.availWidth,
			Y: Math.random()*window.screen.availHeight
		});
	}

	SnowflakeInterval = setInterval(SnowflakeUpdate, 10);
}

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

	//snowflake stuff

	SnowflakeInit();
}