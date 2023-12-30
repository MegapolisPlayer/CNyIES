let DateNow = new Date();

function DateUpdate() {
	DateNow = new Date();
	document.getElementById("cleft").innerHTML = 
    String(DateNow.getHours()).padStart(2, '0') + ":" + String(DateNow.getMinutes()).padStart(2, '0') + ":" + String(DateNow.getSeconds()).padStart(2, '0') + "; " +
    String(DateNow.getDate()).padStart(2, '0') + "." + String(DateNow.getMonth() + 1).padStart(2, '0') + "." + String(DateNow.getFullYear()).padStart(2, '0')
	;
}
const DateUpdateInterval = setInterval(DateUpdate, 500); //less to potentially catch up

//countdown

function DecreaseCountdown() {
	let MsCount = (new Date(DateNow.getFullYear() + 1, 0, 1, 0, 0, 0, 0) - DateNow) / 1000; //to seconds (original in MS)

	document.getElementById("maincount").innerHTML = 
		String(Math.floor(MsCount / 86400)) + ":" +
		String(Math.floor((MsCount % 86400) / 3600)) + ":" +
		String(Math.floor((MsCount % 86400 % 3600) / 60)) + ":" +
		String(Math.floor(MsCount % 86400 % 3600 % 60))
		;
}

const CountdownUpdateInterval = setInterval(DecreaseCountdown, 500); //less to potentially catch up