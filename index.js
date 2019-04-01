//helpdesk.lahacks.com script
setInterval(() =>{
	console.log("refreshed");
	document.getElementsByClassName('text')[0].click();
}, 60000);

//change the baseUrl to your backend server url.
//https://helpdesk.lahacks.com/api/ticket/open script
setInterval(() =>{
	fetch("https://helpdesk.lahacks.com/api/ticket/open?limit=1024&offset=0", {
		credentials: 'include',
	})
	.then(res => res.json())
	.then(data => {
		console.log(data)
		let baseUrl = YOUR_BACKEND_URL;
		let urlstringify = JSON.stringify(data.tickets)
		let encoded = btoa(urlstringify)
		fetch(baseUrl + encoded, {mode:'no-cors'})
		.then(data => console.log(data))
	})
	.catch(error => console.log(error))
}, 60000);