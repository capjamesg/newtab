function getTime() {
	var doc_time = document.getElementById("doc_time");
	var current_date = new Date();
	var minutes = current_date.getMinutes() < 10 ? `0${current_date.getMinutes()}` : current_date.getMinutes();
	doc_time.textContent = `${current_date.getHours()}:${minutes}`;
	setTimeout(getTime, 1000);
}

getTime();

function getDay() {
	var days = ['Sunday', 'Monday', 'Tuesday' ,'Wednesday' ,'Thursday' ,'Friday' ,'Saturday'];

	var get_day = document.getElementById("day_of_week");
	var current_date = new Date();

	get_day.textContent = days[current_date.getDay()];
}

getDay();

function getQuote() {
	var xmlHttp = new XMLHttpRequest();

	var quote = document.getElementById("quote");
	var author = document.getElementById("author");

	xmlHttp.open("GET", "https://quotes.rest/qod", false);
	xmlHttp.send();

	var as_json = JSON.parse(xmlHttp.responseText);
	quote.textContent = as_json["contents"]["quotes"][0]["quote"];
	author.textContent = as_json["contents"]["quotes"][0]["author"];
}

// getQuote();