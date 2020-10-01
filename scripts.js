function getTime() {
	var doc_time = document.getElementById("doc_time");
	var current_date = new Date();
	var minutes = current_date.getMinutes() < 10 ? `0${current_date.getMinutes()}` : current_date.getMinutes();

	doc_time.textContent = `${current_date.getHours()}:${minutes}`;
	setTimeout(getTime, 1000);
}

getTime();

function getDays() {
	// Get day of week

	var days = ['Sunday', 'Monday', 'Tuesday' ,'Wednesday' ,'Thursday' ,'Friday' ,'Saturday'];

	var get_day = document.getElementById("day_of_week");
	var current_date = new Date();

	get_day.textContent = days[current_date.getDay()];

	// Calculate days until birthday / International Coffee Day

	var current_date = new Date();
	var birthday = new Date(current_date.getFullYear(), 9, 1);

	var days_until_birthday = Math.trunc((birthday.getTime() - current_date.getTime()) / (1000 * 3600 * 24));

	var until_birthday = document.getElementById("until_birthday");

	var countdown = days_until_birthday;

	if (countdown > 1) {
		until_birthday.textContent = `There are ${countdown} days left to go until your birthday and International Coffee Day.`;
	} else if (countdown == 1) {
		until_birthday.textContent = `There is ${countdown} day left to go until your birthday and International Coffee Day.`;
	} else {
		until_birthday.textContent = `Happy birthday and International Coffee Day! ☕`
	}

	// var countdown_display = document.getElementById("countdown_display");
	// var christmas = new Date(current_date.getFullYear(), 9, 1);
	// var days_until_christmas = Math.trunc((christmas.getTime() - current_date.getTime()) / (1000 * 3600 * 24));

	// var countdown = days_until_christmas + 1;

	// if (countdown > 1) {
	// 	until_birthday.textContent = `There are ${countdown} days`;
	// } else {
	// 	until_birthday.textContent = `There is ${countdown} day`;
	// }
}

getDays();

function showQuote(result) {
	var quote = document.getElementById("quote");
	var author = document.getElementById("author");
	var special_day = document.getElementById("special_day");

	var current_date = new Date();

	var saved = `${current_date.getDate()}/${current_date.getMonth()}/${current_date.getFullYear()}`;

	if (!result.final_quote || result.final_quote.saved_date != saved) {
		var clear = browser.storage.local.remove("final_quote");

		// Retrieve quote of the day

		var xmlHttp = new XMLHttpRequest();

		xmlHttp.open("GET", "https://quotes.rest/qod", false);
		xmlHttp.send();

		var as_json = JSON.parse(xmlHttp.responseText);

		quote.textContent = as_json["contents"]["quotes"][0]["quote"];
		author.textContent = as_json["contents"]["quotes"][0]["author"];

		// Retrieve fun holiday of the year

		var new_request = new XMLHttpRequest();

		new_request.open("GET", "https://jamesg.blog/assets/days_of_year.json", false);

		new_request.send();

		var day_as_json = JSON.parse(new_request.responseText);

		var date_with_padded_zero = ("0" + current_date.getDate()).slice(-2);
		var month_with_padded_zero = ("0" + (current_date.getMonth() + 1)).slice(-2);

		var to_retrieve = `${date_with_padded_zero}/${month_with_padded_zero}`;

		special_day.textContent = day_as_json[to_retrieve][1];

		// Populate data to save in storage

		var final_quote = {
			quote: as_json["contents"]["quotes"][0]["quote"],
			author: as_json["contents"]["quotes"][0]["author"],
			saved_date: saved,
			special_day: day_as_json[to_retrieve][1]
		}

		browser.storage.local.set({final_quote});

	} else {
		quote.textContent = result.final_quote.quote;
		author.textContent = result.final_quote.author;
		special_day.textContent = result.final_quote.special_day;
	}
}

function getQuote() {
	const get_quote_from_storage = browser.storage.local.get("final_quote").then(result => showQuote(result));
}

getQuote();

browser.storage.local.clear();