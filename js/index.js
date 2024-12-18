//language updates

let HeadersShort = [
    "VNrIZ",
    "CNyIES",
    "РНгИРС",
    "IESWNj",
    "BNrSIR",
	"SIENAN",
	"KUjISR",
]; 

let Headers = [
    "Vánoční a Novoroční informační a zábavný systém",
    "Christmas and New Year Information and Entertainment System",
    "Рождественско-новогодняя информационно-развлекательная система",
    "Informations- und Entertainment-System für Weihnachten und Neujahr",
    "Bożonarodzeniowy i Noworoczny System Informacyjno-Rozrywkowy",
	"Sistema de Información y Entretenimiento de Navidad y Año Nuevo",
	"Karácsonyi és újévi információs és szórakoztató rendszer"
]; 
    
let LangId = 0;
    
function ChangeHeader() {
    LangId++;
	if(LangId == Headers.length) { LangId = 0; }
	document.getElementById("header").innerHTML = HeadersShort[LangId];
	document.getElementById("headerp").innerHTML = Headers[LangId];
}
const HeaderChangeInterval = setInterval(ChangeHeader, 2000);

//form

function UpdateStyle() {
	let StyleObject = document.querySelector(":root").style;
	
	StyleObject.setProperty(
		"--mainbgcolor", 
		"rgb("+document.getElementById("colorbr").value+","+document.getElementById("colorbg").value+","+document.getElementById("colorbb").value+")"
	);
	StyleObject.setProperty(
		"--mainfgcolor", 
		"rgb("+document.getElementById("colorfr").value+","+document.getElementById("colorfg").value+","+document.getElementById("colorfb").value+")"
	);
}

function ColorInputChangeHandler(ColorLetter) {
	let ColorString;
	switch(ColorLetter) {
		case "br":
		case "fr":
			ColorString = "Red: ";
			break;
		case "bg":
		case "fg":
			ColorString = "Green: ";
			break;
		case "bb":
		case "fb":
			ColorString = "Blue: ";
			break;
	}

	document.getElementById("lcolor"+ColorLetter).innerHTML = ColorString + String(document.getElementById("color"+ColorLetter).value);

	UpdateStyle();
}

function ColorInputCookieHandler() {
	let CookieF = CookieRead("foreground");
	let ArrayF = CookieF.slice(CookieF.indexOf("(") + 1, CookieF.indexOf(")")).split(","); 
	console.log(ArrayF);
	document.getElementById("colorfr").value = Number(ArrayF[0]);
	document.getElementById("colorfg").value = Number(ArrayF[1]);
	document.getElementById("colorfb").value = Number(ArrayF[2]);

	let CookieB = CookieRead("background");
	let ArrayB = CookieB.slice(CookieB.indexOf("(") + 1, CookieB.indexOf(")")).split(","); 
	console.log(ArrayB);
	document.getElementById("colorbr").value = Number(ArrayB[0]);
	document.getElementById("colorbg").value = Number(ArrayB[1]);
	document.getElementById("colorbb").value = Number(ArrayB[2]);

	ColorInputChangeHandler("fr");
	ColorInputChangeHandler("fg");
	ColorInputChangeHandler("fb");
	ColorInputChangeHandler("br");
	ColorInputChangeHandler("bg");
	ColorInputChangeHandler("bb");
}

function SnowInputChangeHandler() {
	document.getElementById("lsnowamount").innerHTML = "Snow: " + String(document.getElementById("snowamount").value);
}

function ColorInputDefaultF() {
	// 255 255 255

	document.getElementById("colorfr").value = 255;
	document.getElementById("colorfg").value = 255;
	document.getElementById("colorfb").value = 255;

	ColorInputChangeHandler("fr");
	ColorInputChangeHandler("fg");
	ColorInputChangeHandler("fb");

	UpdateStyle();
}

function ColorInputDefaultB() {
	// 80 0 0

	document.getElementById("colorbr").value = 80;
	document.getElementById("colorbg").value = 0;
	document.getElementById("colorbb").value = 0;

	ColorInputChangeHandler("br");
	ColorInputChangeHandler("bg");
	ColorInputChangeHandler("bb");

	UpdateStyle();
}

function LangInputDefault() {
	//everything on

	document.getElementById("langcz").checked = true;
	document.getElementById("langen").checked = true;
	document.getElementById("langru").checked = true;
	document.getElementById("langde").checked = true;
	document.getElementById("langpl").checked = true;
	document.getElementById("langsp").checked = true;
	document.getElementById("langhu").checked = true;
}

function OtherDefault() {
	document.getElementById("timemode").checked = false;
}

function SnowInputDefault() {
	document.getElementById("snowamount").value = 2500;
	SnowInputChangeHandler();
}

//init

function InitWebI() {
	document.getElementById("header").innerHTML = HeadersShort[0];
    document.getElementById("headerp").innerHTML = Headers[0];

	if(CookieRead("foreground") == -1 || CookieRead("background") == -1) {
		ColorInputDefaultF();
		ColorInputDefaultB();
	}
	else {
		GetStyleCookies();
		ColorInputCookieHandler();
	}

	for(let i = 0; i < 50; i++) {
		document.getElementById("dsnowamount").innerHTML +=
		"<options>"+i*100+"</options>\r\n";
	}

	//better than onchange
	window.setInterval(() => {
		ColorInputChangeHandler("fr");
		ColorInputChangeHandler("fg");
		ColorInputChangeHandler("fb");
		ColorInputChangeHandler("br");
		ColorInputChangeHandler("bg");
		ColorInputChangeHandler("bb");

		SnowInputChangeHandler();
	}, 100);
}

//move to system page

function MoveToMain() {
	UpdateStyle();

	CookieWrite("foreground", document.querySelector(":root").style.getPropertyValue("--mainfgcolor"));
	CookieWrite("background", document.querySelector(":root").style.getPropertyValue("--mainbgcolor"));

	let langString = "";
	langString += String(Number(document.getElementById("langcz").checked));
	langString += String(Number(document.getElementById("langen").checked));
	langString += String(Number(document.getElementById("langru").checked));
	langString += String(Number(document.getElementById("langde").checked));
	langString += String(Number(document.getElementById("langpl").checked));
	langString += String(Number(document.getElementById("langsp").checked));
	langString += String(Number(document.getElementById("langhu").checked));
	//prevent zeroes only
	langString = (parseInt(langString) == 0) ? "1111111" : langString;
	CookieWrite("langs", langString);
	console.log("lang string "+langString);

	CookieWrite("snow", document.getElementById("snowamount").value);
	CookieWrite("clock", Number(document.getElementById("timemode").checked));

	window.location.href='display.html';
}