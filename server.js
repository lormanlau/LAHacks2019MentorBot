const express = require('express');
const bodyParser = require('body-parser');
const atob = require('atob');
const twilio = require('twilio');
const app = express();

//add your twilio information here
const client = twilio(TWILIO_ACCOUNT_ID, TWILI_ACCOUNT_TOKEN);
const twilioNumber = MY_TWILIO_NUMBER

app.use(bodyParser.urlencoded({extended: false}));


var phoneNumbers = [] 
var activeMessages = []


function sendToAllPhoneNumbers(message) {
	return Promise.all(phoneNumbers.map(number => {
		client.messages.create({
			body: `Question: ${message.message}, Location: ${message.location}`,
			to: number,
			from: twilioNumber
		})
	}))	
}

function sendAllActiveMessages(req) {
	return Promise.all(activeMessages.map(message => {
		client.messages.create({
			body: `Question: ${message.message}, Location: ${message.location}`,
			to: req.body.From,
			from: twilioNumber
		})
	}))
}

app.get('/', (req, res) => {
	res.send("Hello World")
})

app.get('/:dict', (req, res) => {
	let encodedDict = req.params.dict;
	let decodedDict = atob(encodedDict);
	let json = JSON.parse(decodedDict);
	let prepareToSendMessages =[]
	json.forEach(message => {
		let found = false;
		for (var i = 0; i < activeMessages.length; i++) {
			if (message.ticketid == activeMessages[i].ticketid) {
				found = true;
				break;
			}
		}
		if (!found) {
			prepareToSendMessages.push(message)
		}
	})
	activeMessages = json
	Promise.all(prepareToSendMessages.map(message => {
		return sendToAllPhoneNumbers(message)
	}))
	.then("Sent new Message")
	res.send('')
})

app.post('/sms', (req, res) => {
	let msg = req.body.Body.toLowerCase().trim();
	if (msg == "sub" || msg == "subscribe") {
		phoneNumbers.push(req.body.From)
		console.log("Number added", phoneNumbers)
		return res.send('subbed to LAHacks19 Mentor Bot, send unsub to stop messages')
	} else if (msg == "unsub" || msg == "unsubscribe") {
		phoneNumbers = phoneNumbers.filter(number => req.body.From != number);
		console.log("Number removed", phoneNumbers)
		return res.send('unsubbed to LAHacks19 Mentor Bot')
	} else if (msg == 'all') {
		sendAllActiveMessages(req)
		.then(data => console.log("Finished Sending all to " + data))
	}
	res.send('')
})

app.listen(3000, () => console.log("port 3000"))