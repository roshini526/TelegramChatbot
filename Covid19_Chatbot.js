var TelegramBot = require('node-telegram-bot-api');

var req = require("request")

var Key = "1079586289:AAGHRrYWbWi_q39IlZ3OVCWzQZn5yMHLqz4"

var bot = new TelegramBot(Key, {polling: true});

bot.on("polling_error", (err) => console.log(err));

bot.on('message', function(msg){

	var ms = msg.text;
	var temp = ms.split(" ");
	var content = ms.toLowerCase();
	var str = temp[3];

	if(content == "hi" || content == "hola"){

			bot.sendMessage(msg.chat.id, "Hi Roshini!!!")
			bot.sendMessage(msg.chat.id, "How can I help you?")

	}

	else if(content == "show top news of the day" || content == "show headlines"  || content == "news" || content == "headlines" || content == "show news"){

		req("https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=4e10bb56331648988b2ac6a52eff2e67", function(err, res, body){
	
		if(err){
			console.log(err)
			bot.sendMessage(msg.chat.id, "Something went wrong")
		}

		else{
			var len = JSON.parse(body).articles.length;
			for(var i=0; i< len / 2; i++){
				bot.sendMessage(msg.chat.id, "-> " + JSON.parse(body).articles[i].title + "\n" + JSON.parse(body).articles[i].urlToImage)
			}
		}
		})
	}

	else if(content == "show covid cases worldwide" || content == "world covid cases" || content == "covid world wide"){


		req("https://coronavirus-19-api.herokuapp.com/countries", function(err, res, body){
			bot.sendMessage(msg.chat.id, "Here are the Covid Updates WorldWide ")

				var txt = JSON.parse(body)[0];
				console.log(txt);
				bot.sendMessage(msg.chat.id, /*"Today Cases  : " + txt.todayCases + "\n"  + "Today Deaths : " + txt.todayDeaths + "\n" + */
											 "Total Cases  : " + txt.cases + "\n"  +      "Total Deaths : " +  txt.deaths + "\n" + 
											 "Recovered    : " + txt.recovered + "\n" +   "Active Cases : " + txt.active);

			})
	}

	else if(temp[4] == "Indian") {
		req("https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise", function(err, res, body){
		bot.sendMessage(msg.chat.id, "Here are the Covid Updates in " + temp[6])
		var d = JSON.parse(body).data.statewise;
		var len = d.length;
		for(var i = 0; i < len; i++){
			var n = d[i];
				var s = n['state'];
				console.log(s);
				if(s == temp[6]){
					bot.sendMessage(msg.chat.id, /*"Today Cases  : " + txt.todayCases + "\n"  + "Today Deaths : " + txt.todayDeaths + "\n" + */
											 "Total Cases  : " + n.confirmed + "\n"  +    "Total Deaths : " +  n.deaths + "\n" + 
											 "Recovered    : " + n.recovered + "\n" +   "Active Cases : " + n.active);

					break;
				}
		}
		})
	}
	else if(str == "in"){

			req("https://coronavirus-19-api.herokuapp.com/countries", function(err, res, body){
			

				var len = JSON.parse(body).length;
				bot.sendMessage(msg.chat.id, "Here are the Covid Updates in " + temp[4])

				for(var i = 0; i <= len; i++){
					var n = JSON.parse(body)[i];
					var name = n.country;
					console.log(name);
					if(temp[4] == name){
						var txt = n;
						bot.sendMessage(msg.chat.id, /*"Today Cases  : " + txt.todayCases + "\n"  + "Today Deaths : " + txt.todayDeaths + "\n" + */
											 "Total Cases  : " + txt.cases + "\n"  +      "Total Deaths : " +  txt.deaths + "\n" + 
											 "Recovered    : " + txt.recovered + "\n" +   "Active Cases : " + txt.active);

						break;
					}
				}

			})
	}



	else if(content == "thank you" || content == "thanks"){
		bot.sendMessage(msg.chat.id, "Thanks for using the chatbot")
		bot.sendMessage(msg.chat.id, "I'm happy to help Anytime!!")
	}

	else{
		bot.sendMessage(msg.chat.id, "Can to say again")
	}

})

