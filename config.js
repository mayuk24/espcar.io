const
	host	= (process.env.HOST || 'YOUR-HOST'),
	port	= (process.env.PORT || 'YOUR-PORT'),
	ssid	= (process.env.SSID || 'YOUR-SSID'),
	pass	= (process.env.PASS || 'YOUR-PASS');

	module.exports = {host,port,ssid,pass};