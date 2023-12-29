export function CookieWrite(key, value) {
	document.cookie = key+"="+value+";SameSite=lax;path=/;";
}
export function CookieRead(key) {
	if(document.cookie.indexOf(key) == -1) {
		return -1;	
	}
	if(document.cookie.indexOf(";", document.cookie.indexOf(key) + key.length) == -1) {
		//no semicolon - only cookie!
		return document.cookie.substring(document.cookie.indexOf(key) + key.length + 1, document.cookie.length);
	}
	return document.cookie.substring(document.cookie.indexOf(key) + key.length + 1, document.cookie.indexOf(";", document.cookie.indexOf(key) + key.length));
}
