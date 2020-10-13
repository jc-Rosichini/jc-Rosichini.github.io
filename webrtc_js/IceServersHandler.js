// IceServersHandler.js

var IceServersHandler = (function() {
    function getIceServers(connection) {
        var iceServers = [
			{url:'stun.rapidnet.de:3478'},
			{url:'stun.rb-net.com:3478'},
			{url:'stun.rixtelecom.se:3478'},
			{url:'stun.rockenstein.de:3478'},
			{url:'stun.rolmail.net:3478'},
			{url:'stun.rynga.com:3478'},
			{url:'stun.schlund.de:3478'},
			{url:'stun.services.mozilla.com:3478'},
			{url:'stun.sigmavoip.com:3478'},
			{url:'stun.sip.us:3478'},
			{url:'stun.sipdiscount.com:3478'},
			{url:'stun.sipgate.net:10000'},
			{url:'stun.sipgate.net:3478'},
			{url:'stun.siplogin.de:3478'},
			{url:'stun.sipnet.net:3478'},
			{url:'stun.sipnet.ru:3478'},
			{url:'stun.siportal.it:3478'},
			{url:'stun.sippeer.dk:3478'},
			{url:'stun.siptraffic.com:3478'},
			{url:'stun.skylink.ru:3478'},
			{url:'stun.sma.de:3478'},
			{url:'stun.smartvoip.com:3478'},
			{url:'stun.smsdiscount.com:3478'},
			{url:'stun.snafu.de:3478'},
			{url:'stun.softjoys.com:3478'},
			{url:'stun.solcon.nl:3478'},
			{url:'stun.solnet.ch:3478'},
			{url:'stun.sonetel.com:3478'},
			{url:'stun.sonetel.net:3478'}
		];

        iceServers.push(getSTUNObj('stun:stun.l.google.com:19302'));

        iceServers.push(getTURNObj('stun:webrtcweb.com:7788', 'muazkh', 'muazkh')); // coTURN
        iceServers.push(getTURNObj('turn:webrtcweb.com:7788', 'muazkh', 'muazkh')); // coTURN
        iceServers.push(getTURNObj('turn:webrtcweb.com:8877', 'muazkh', 'muazkh')); // coTURN

        iceServers.push(getTURNObj('turns:webrtcweb.com:7788', 'muazkh', 'muazkh')); // coTURN
        iceServers.push(getTURNObj('turns:webrtcweb.com:8877', 'muazkh', 'muazkh')); // coTURN

        // iceServers.push(getTURNObj('turn:webrtcweb.com:3344', 'muazkh', 'muazkh')); // resiprocate
        // iceServers.push(getTURNObj('turn:webrtcweb.com:4433', 'muazkh', 'muazkh')); // resiprocate

        // check if restund is still active: http://webrtcweb.com:4050/
        iceServers.push(getTURNObj('stun:webrtcweb.com:4455', 'muazkh', 'muazkh')); // restund
        iceServers.push(getTURNObj('turn:webrtcweb.com:4455', 'muazkh', 'muazkh')); // restund
        iceServers.push(getTURNObj('turn:webrtcweb.com:5544?transport=tcp', 'muazkh', 'muazkh')); // restund

        return iceServers;
    }

    function getSTUNObj(stunStr) {
        var urlsParam = 'urls';
        if (typeof isPluginRTC !== 'undefined') {
            urlsParam = 'url';
        }

        var obj = {};
        obj[urlsParam] = stunStr;
        return obj;
    }

    function getTURNObj(turnStr, username, credential) {
        var urlsParam = 'urls';
        if (typeof isPluginRTC !== 'undefined') {
            urlsParam = 'url';
        }

        var obj = {
            username: username,
            credential: credential
        };
        obj[urlsParam] = turnStr;
        return obj;
    }

    return {
        getIceServers: getIceServers
    };
})();
