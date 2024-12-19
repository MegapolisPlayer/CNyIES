let DateNow = new Date();

function DateUpdate() {
	DateNow = new Date();
	//DateNow.setTime(DateNow.getTime() + (12*86400*1000) + (12*3600*1000) + (56*60*1000)); //DEBUG offset for testing
	let List = document.querySelectorAll(".time");
	
	for(let i = 0; i < List.length; i++) {
		List[i].innerHTML = 
		String(DateNow.getHours()).padStart(2, '0') + ":" + String(DateNow.getMinutes()).padStart(2, '0') + ":" + String(DateNow.getSeconds()).padStart(2, '0') + "; " +
		String(DateNow.getDate()).padStart(2, '0') + "." + String(DateNow.getMonth() + 1).padStart(2, '0') + "." + String(DateNow.getFullYear()).padStart(2, '0')
		;
	}
}
const DateUpdateInterval = setInterval(DateUpdate, 500); //less to potentially catch up