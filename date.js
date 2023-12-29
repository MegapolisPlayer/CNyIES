//date update

export let DateNow = new Date();

export function DateUpdate() {
	DateNow = new Date();
	document.getElementById("cleft").innerHTML = 
    String(DateNow.getHours()).padStart(2, '0') + ":" + String(DateNow.getMinutes()).padStart(2, '0') + ":" + String(DateNow.getSeconds()).padStart(2, '0') + "; " +
    String(DateNow.getDate()).padStart(2, '0') + "." + String(DateNow.getMonth() + 1).padStart(2, '0') + "." + String(DateNow.getFullYear()).padStart(2, '0')
	;
}
const DateUpdateInterval = setInterval(DateUpdate, 500); //less to potentially catch up