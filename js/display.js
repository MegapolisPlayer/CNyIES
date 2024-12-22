//language updates

let Headers = [
    "Veselé Vánoce a Štastný Nový Rok",
	"Merry Christmas and a Happy New Year",
	"С Новым Годом и Счастливого Рождества",
	"Fröhe Weihnachten und eines gutes neues Jahr",
	"Błogosławionych Świąt Bożego Narodzenia i Wspanialego Nowego Roku",
	"Feliz Navidad y Próspero Año Nuevo",
	"Boldog karácsonyt és boldog új évet"
];

let Count = [
    "Odpočet do Nového Roku",
	"Countdown to the New Year",
	"Отсчет до Нового года",
	"Neujahr-Countdown",
	"Odliczanie do Nowego Roku",
	"Cuenta regresiva para el nuevo año",
	"Visszaszámlálás az új évig"
]; 
let TimeNames = [
    "Aktuální čas",
	"Current time",
	"Текущее время",
	"Aktuelle Zeit",
	"Aktualny czas",
	"Hora actual",
	"Aktuális idő"
];

let CountdownDescs = [
    "Den:Hodina:Minuta:Sekunda",
    "Day:Hour:Minute:Second",
    "День:Час:Минута:Секунда",
    "Tag:Stunde:Minute:Sekunde",
    "Dzień:Godzina:Minuta:Sekunda",
	"Día:Hora:Minuto:Segundo",
	"Nap:Óra:Perc:Második"
];
let TimeFormat = [
    "Hodina:Minuta:Sekunda",
    "Hour:Minute:Second",
    "Час:Минута:Секунда",
    "Stunde:Minute:Sekunde",
    "Godzina:Minuta:Sekunda",
	"Hora:Minuto:Segundo",
	"Óra:Perc:Második"
];

let Music = [
	"Hudba",
	"Music",
	"Музыка",
	"Musik",
	"Muzyka",
	"Música",
	"Zene"
]; 
let TzMap = [
    "Mapa časových pásem",
    "Map of timezones",
    "Карта часовых поясов",
    "Karte der Zeitzonen",
    "Mapa stref czasowych",
	"Mapa de zonas horarias",
	"Időzónák térképe"
]; 
         
let LangId = 0;

//configs

let TimeMode = false;
// 0 is blocked, 1 is allowed
let LangIdBlock = [ 1, 1, 1, 1, 1, 1 ];
         
function ChangeHeader() {
	LangId++;
	if(LangId == Headers.length) { LangId = 0; }

	//move further
	while(LangIdBlock[LangId] === 0) {
		LangId++;
		if(LangId == Headers.length) { LangId = 0; }
	}

	document.getElementById("header").innerHTML = Headers[LangId];

	if(TimeMode) {
		//clock mode
		document.getElementById("countname").innerHTML = TimeNames[LangId];
		document.getElementById("countdowndesc").innerHTML = TimeFormat[LangId];
	}
	else {
		//countdown mode
		document.getElementById("countname").innerHTML = Count[LangId];
		document.getElementById("countdowndesc").innerHTML = CountdownDescs[LangId];
	}

	document.getElementById("musicname").innerHTML = Music[LangId];
	document.getElementById("tzmapname").innerHTML = TzMap[LangId];
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

		//can be -60 and 60
		if(Math.abs(TimeUntilNewYearM) == 60) {
			TimeUntilNewYearM = 0;
			TimeUntilNewYearH -= 1;
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
				TimeUntilNewYearText = ">99h";
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

let PadWithZeroes = false;

let PlayMusicOnMidnight = false;

function DecreaseCountdown() {
	if(TimeMode) {
		document.getElementById("maincount").innerHTML = 
		String(DateNow.getHours()).padStart(2, '0') + ":" +
		String(DateNow.getMinutes()).padStart(2, '0') + ":" +
		String(DateNow.getSeconds()).padStart(2, '0');

		document.getElementById("sidecount").innerHTML = 
			String(DateNow.getDate()) + "." +
			String(DateNow.getMonth()+1) + "." +
			String(DateNow.getFullYear());

		return;

	}

	let Seconds = (new Date(DateNow.getFullYear() + 1, 0, 1, 0, 0, 0, 0) - DateNow) / 1000; //to seconds (original in MS)

	//new year passed - first week of January - GREY countdown
	if((DateNow.getDate() <= 7 && DateNow.getMonth() == 0) || DEBUG_ForceChanges) {
		document.getElementById("maincount").style = "filter: brightness(30%);";

		if(PlayMusicOnMidnight) {
			PlayMusicOnMidnight = false; //fire only once

			let yturl = "https://www.youtube.com/embed/XiTIfH0TpTg&version=3&autoplay=1&disablekb=1&loop=1&color=white";
			document.getElementById("ytif").src = yturl;
			console.log("changed music");
		}
	}

	let RDays = Math.floor(Seconds / 86400);
	let RHrs = Math.floor((Seconds % 86400) / 3600);
	let RMins = Math.floor((Seconds % 86400 % 3600) / 60);
	let RSecs = Math.floor(Seconds % 86400 % 3600 % 60);

	let ResultingString = "";
	if(PadWithZeroes) {
		ResultingString = String(RDays).padStart(2, '0') + ":" +
		String(RHrs).padStart(2, '0') + ":" +
		String(RMins).padStart(2, '0') + ":" +
		String(RSecs).padStart(2, '0');
	}
	else {
		if(RDays != 0) {
			ResultingString += String(RDays).padStart(2, '0') + ":";
		}
		if(RHrs != 0) {
			ResultingString += String(RHrs).padStart(2, '0') + ":";
		}
		if(RMins != 0) {
			ResultingString += String(RMins).padStart(2, '0') + ":";
		}
		ResultingString += String(RSecs).padStart(2, '0');
	}

	document.getElementById("maincount").innerHTML = ResultingString;

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
let SnowflakesAmount;

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

	SnowflakesAmount = Number(CookieRead("snow"));

	for(let i = 0; i < SnowflakesAmount; i++) {
		Snowflakes.push({
			X: Math.random()*window.screen.availWidth,
			Y: Math.random()*window.screen.availHeight
		});
	}

	SnowflakeInterval = setInterval(SnowflakeUpdate, 10);
}

//sourced from my own playlist
//https://www.youtube.com/playlist?list=PL5d1YE_8Im7NeG2G09qax1KZPClQbE1p7
let MusicYTIDs = [
	"m8M69mrfQlo",
	"V3BLUMLB-xI",
	"QBF0F3haAZM",
	"EMT_J-gYYz8",
	"5Xvo0-QBFeQ",
	"WoS1y88zx6A",
	"JderOU9IBTo",
	"KO5akJ29wwQ",
	"sl-xupx1bVU",
	"ozyxPcK1r6c",
	"Mq3hRVAC1GE",
	"XiTIfH0TpTg",
	"CWKYyqpSbgU",
	"JGX8umOcmPg",
	"ZLqbkBPNEUU",
	"3BS9ohD1R5g",
	"CRb7Ugl8HVs",
	"3RJ2gEFXzgc",
	"O0fkOIR_67I"	
];

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

	TimeMode = Boolean(Number(CookieRead("clock")));
	console.log("Time mode "+TimeMode);
	LangIdBlock = CookieRead("langs").split('').map((v) => { return parseInt(v); });
	console.log("Language permissions "+LangIdBlock);
	PadWithZeroes = Boolean(Number(CookieRead("pad")));

	PlayMusicOnMidnight = Boolean(Number(CookieRead("music")));

	//setup headers
	ChangeHeader();

	//init player

	let yturl = "https://www.youtube.com/embed/0?playlist=";

	MusicYTIDs.forEach((v) => {
		yturl += v;
		yturl += ',';
	});

	yturl += "&version=3&autoplay=1&disablekb=1&loop=1&color=white";

	document.getElementById("ytif").src = yturl;

	DrawWorldMap();
	DrawTimezoneBounds();

	//snowflake stuff

	SnowflakeInit();
}