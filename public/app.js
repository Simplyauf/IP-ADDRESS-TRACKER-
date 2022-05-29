let InputIpAddress = document.querySelector(".input-ipAddress");
let Btn = document.querySelector(".Btn");
let errorModal = document.querySelector(".Error-Modal");
let ipAddressLocation = document.querySelector(".ipAddress-location");
let ipAddressTimezone = document.querySelector(".ipAddress-timezone");
let ipAddressISP = document.querySelector(".ipAddress-ISP");
let currentIpAddress = document.querySelector(".current-ipAddress");

function updateLocationDetails(ipDatas) {
	const { location, ip, isp } = ipDatas;

	ipAddressLocation.textContent = location.city;
	ipAddressTimezone = location.timezone;
	ipAddressISP.textContent = isp;
	currentIpAddress.textContent = ip;
}

window.addEventListener("load", () => {
	let InputIpAddressValue = InputIpAddress.value;
	displayMap(InputIpAddressValue);
});

Btn.addEventListener("click", () => {
	let InputIpAddressValue = InputIpAddress.value;
	if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(InputIpAddressValue)) {
		displayMap(InputIpAddressValue);
	} else if (!InputIpAddressValue) {
		errorModal.textContent = "Please type in a value";
		errorModal.style.display = "block";
		setTimeout(() => {
			errorModal.style.display = "none";
		}, 2000);
	} else {
		errorModal.textContent = "invalid IP-ADRESS value";
		errorModal.style.display = "block";
		setTimeout(() => {
			errorModal.style.display = "none";
		}, 2000);
	}
});

function displayMap(ipValue) {
	let geolocationApi = `https://geo.ipify.org/api/v2/country,city?apiKey=at_MC8t0qptN9qIYw6LZtBLt95Xm6Z8P&ipAddress=${ipValue}`;
	getResponse(geolocationApi);
	data(geolocationApi);
}

// fetching api
function getResponse(geolocationApi) {
	return fetch(geolocationApi).then((response) => {
		if (response.status >= 200 && response.status <= 299) {
			return response.json();
		} else {
			throw new Error(response.status);
		}
	});
}

const errorType = document.querySelector(".error");
function data(geolocationApi) {
	getResponse(geolocationApi)
		.then((data) => {
			let lat = data.location.lat;
			let lng = data.location.lng;
			console.log(data);
			updateLocationDetails(data);
			mapp(lat, lng);
		})
		.catch((error) => console.log(error));
}

// displaying map
function mapp(lat, lng) {
	var container = L.DomUtil.get("map");
	if (container["_leaflet_id"] != null) {
		container._leaflet_id = null;
	}

	var map = L.map("map").setView([lat, lng], 13);
	L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: "mapbox/streets-v11",
		tileSize: 512,
		zoomOffset: -1,
		accessToken: "pk.eyJ1Ijoic2ltcGx5YXVmIiwiYSI6ImNsMTlsc2NuODB0ajEza2xpZncxdGFyYWgifQ.lxpu8zoaAWUOWpPydxBWOQ",
	}).addTo(map);

	var marker = L.marker([lat, lng]).addTo(map);
}
