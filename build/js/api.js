/**
 * ---------------------------
 * Salesboard Javascript API
 * Internal release v4.0.11
 * November 2014 - Sharewire
 * ---------------------------
 */

window.SBapiVersion =  '4.0.11';
window.shouldconnect = false;
window.sent = {};
window.salesboard = {
    /**
     * Connect is your main startup function.
     * You can optionally pass an options object that can contain:
     * onOpen: function(event) { console.log('connected!'),
	 * onClose: function(event) { console.log('disconnected!');
	 * onMessage: function(event) { console.log('message received!');
	 */
    connect: function(options) {
        options.version = window.SBapiVersion;
        console.log("Window.salesboard.api.connect! v" + options.version);

        var ua = navigator.userAgent.toLowerCase();
        if(ua.indexOf('ipad') > -1 || navigator.vendor.toLowerCase().indexOf('apple') > -1 || (window.useSockets && window.useSockets===true)) {
            window.SalesBoardSocket = window.iOSConnection = {};//Fake connection used later
            window.salesboard.connectOptions = options;
            console.log("iOS Interface bound: ", window.SalesBoardSocket);
        }else{//Android
            window.SalesBoardSocket = new window.salesboard._salesboardInterface(options);
            if(window.shouldconnect){
                window.SalesBoardSocket.connection.connect();
            }
            console.log("Android Interface bound: ", window.SalesBoardSocket);
        }
    },
    api: {
        /**
         * API functions dedicated to manipulating Salesboard addons
         */
        addon: {
            /**
             * open Opens an addon by ID (ID_Addon) or by name
             * @param string ID_Addon Id of the addon
             * @param string name Name of the addon
             * @event function onComplete a callback that is executed when the action has succeeded
             * @event function onError a callback that is executed when the action has failed
             */
            open: function(params, events){
                return window.SalesBoardSocket.send('addon.open', { parameters: params, events: events });
            },
            /**
             * close the addon.
             * @event function onComplete a callback that is executed when the action has succeeded
             * @event function onError a callback that is executed when the action has failed
             */
            close: function(params, events){
                return window.SalesBoardSocket.send('addon.close', { parameters: params, events: events });
            },
            /**
             * Close the currently active addon, and open a new one, based on the 'ID_Addon' parameter passed to this function.
             * @param string ID_Addon of the addon.
             * @event function onComplete a callback that is executed when the action has succeeded
             * @event function onError a callback that is executed when the action has failed
             */
            switchTo: function(params, events){
                return window.SalesBoardSocket.send('addon.switchto', { parameters: params, events: events });
            }
        },
        /**
         * Api functions dedicated to manipulating presentations
         */
        presentation: {
            /**
             * open Opens a presentation by it's ID_Presentation or by name
             * @param string ID_Presentation Id of the presentation
             * @param string name Name of the presentation
             * @event function onComplete a callback that is executed when the action has succeeded
             * @event function onError a callback that is executed when the action has failed
             */
            open: function(params, events){
                return window.SalesBoardSocket.send('presentation.open', { parameters: params, events: events });
            }
        },
        /**
         * Api functions dedicated to manipulating form
         */
        form: {
            /**
             * open Opens a presentation by it's ID_Form or by name
             * @param string ID_Form Id of the form
             * @param string name Name of the form
             * @event function onComplete a callback that is executed when the action has succeeded
             * @event function onError a callback that is executed when the action has failed
             */
            open: function(params, events){
                return win<dow.SalesBoardSocket.send('form.open', { parameters: params, events: events });
            }
        },
        /**
         * Api functions dedicated to manipulating pitch cards
         */
        pitchcard: {
            /**
             * open Opens a presentation by it's ID_Pitchcard or by name
             * @param string ID_Pitchcard Id of the pitchcard
             * @param string name Name of the pitchcard
             * @event function onComplete a callback that is executed when the action has succeeded
             * @event function onError a callback that is executed when the action has failed
             */
            open: function(params, events){
                return window.SalesBoardSocket.send('pitchcard.open', { parameters: params, events: events });
            }
        },

        /**
         * Api functions dedicated to manipulating current session
         */
        session: {
            /**
             * Saves object 'val' under key 'key'  into the session.
             * Will last only for the current login. On app-terminate this has to be re-done.
             * @param string key The key to save this value to.
             * @param string val A sting or json object (JSON-encoded) object value to store under this key.
             * @event function onComplete a callback that is executed when the action has succeeded
             * @event function onError a callback that is executed when the action has failed
             */
            setVariable: function(params, events) {
                return window.SalesBoardSocket.send('session.setVariable', { parameters: params , events: events });
            },

            /**
             * Reads object 'key' from the session.
             * Will return NULL if key not available. Session vars only last as long as the app is running.
             * @param string key The key to get the value for.
             * @event function onComplete a callback that is executed when the action has succeeded
             * @event function onError a callback that is executed when the action has failed
             */
            getVariable: function(params, events) {
                return window.SalesBoardSocket.send('session.getVariable', { parameters: params, events: events });
            },

            /**
             * Returns all variables in current session.
             * Will return NULL if there is no session or empty if there is no variables yet. Session vars only last as long as the app is running.
             * @event function onComplete a callback that is executed when the action has succeeded
             * @event function onError a callback that is executed when the action has failed
             */
            getAllVariables: function(params, events) {
                return window.SalesBoardSocket.send('session.getAllVariables', { parameters: params, events: events });
            },

            /**
             * Delete all pairs key-value in session.
             * Will return NULL if key not available. Session vars only last as long as the app is running.
             * @param string key The key to get the value for.
             * @event function onComplete a callback that is executed when the action has succeeded
             * @event function onError a callback that is executed when the action has failed
             */
            clear: function(params, events) {
                return window.SalesBoardSocket.send('session.clear', { parameters: params, events: events });
            }
        },
        /**
         * Custom database queries to tables published from salesboard servers.
         */
        database: {
            /**
             * Returns the result of custom query selection of 1 or more collumns given a table and a optional condition
             * @param string table The table name where the query must run against to (e.g. {'table': 'Products.csv'})
             * @param jsonArray columns A array of column names that must be selected (e.g. {'columns': ['PRODUCT_NAME', 'PRODUCT_TYPE']})
             * @param string where Optional string that defines the condition (e.g. {'where': 'PRODUCT_NAME' = 'RT_ZIP' AND 'DISTANCE' <= '100' })
             */
            select: function(params, events) {
                return window.SalesBoardSocket.send('database.select', { parameters: params, events: events });
            }
        },
        /**
         * Custom calls to log stats and measurables to the salesboard backend.
         */
        stats: {
            /**
             * Log a custom action named 'action' to the log table.
             * This will automatically be appended with timestamp, geo coordinates and user id, cached until next
             * internet connection and sent to the backend where a logreceiver could be invoked to handle this specific
             * log call.
             * @param string action The key to log this call under (translates to backend extra logreceiverproperty)
             * @param int value The value to log. Can only be integer or long. It is optional.
             */
            log: function(params, events) {
                return window.SalesBoardSocket.send('stats.log', { parameters: params, events: events });
            }
        },
        /**
         * API functions that affect user management.
         */
        system: {
            /**
             * Throw an alert with a title to the customer.
             * @param string title Title of the popup
             * @param string message Message to show
             * @param string buttonTitle The title of the button under the message, defaults to 'OK'.
             * @event function onComplete a callback that is executed when the user presses OK.
             * @event function onError a callback that is executed when the alert cannot be shown.
             */
            alert: function(params, events){
                return window.SalesBoardSocket.send('system.alert', { parameters: params, events: events });
            },
            /**
             * Show an confirmation question with a title to the customer.
             * @param string title Title of the popup
             * @param string question Question to show
             * @param string OKButtonTitle The title of the OKbutton under the message, defaults to 'OK'.
             * @param string CancelButtonTitle The title of the cancelbutton under the message, defaults to 'Cancel'.
             * @event function onComplete a callback that is executed when the user presses OK.
             * @event function onError a callback that is executed when the user presses Cancel.
             */
            confirm: function(params, events){
                return window.SalesBoardSocket.send('system.confirm', { parameters: params, events: events });
            },
            /**
             * grab currently loggedin user
             * @event function onError a callback that is executed when the action has failed
             */
            getUser: function(params, events){
                return window.SalesBoardSocket.send('system.getuser', { events: events });
            }
        }
    },


    /**
     * Private Salesboard interface,
     */
    _salesboardInterface: function(options ) {
        console.info("---Creating _salesboardInterface! --- ", options);
        var connection = false,
            connected =  false;
        this.options = options;
        xsocket = this;
        this.events = {
            open: function (e) {
                console.log("Connection opened. Sending 'Connection established!' msg: ", e, this);
                this.connected = true;
                this.sysmsg("Connection established!");
                if(this.options.onOpen) {
                    this.options.onOpen(e);
                }
                var logs = localStorage.getItem('errorQueue');
                if(logs !== null) {
                    try {
                        logs = JSON.parse(logs);
                    }catch(E) {}
                    if(typeof logs === 'array') {
                        for(i=0; i< logs.length; i++) {
                            // window.salesboard.api.stats.log({ action: 'addon.error', value:  logs[i]});
                            console.error('addon.error '+logs[i]);
                        }
                    }
                    localStorage.setItem('errorQueue', null);
                }
            }.bind(this),
            message : function (event) {
                console.log("Incoming message: ", event);
                try
                {
                    console.debug("Message just came in : ", event);
                    var result = JSON.parse(event.data ? event.data : event);
                }
                catch (e)
                {
                    console.debug("Error parsing JSON message! "+e);
                }

                console.log("Message received: " + result.UUID + ": "+result.response);
                if(window.sent[result.UUID]) {
                    console.log("window.sent detected for UUID " + result.UUID);
                    window.sent[result.UUID].response = result.response;
                    window.sent[result.UUID].responseReceived = true;
                    if(!window.sent[result.UUID].events){
                        console.log("window.sent NO EVENT detected");
                        window.sent[result.UUID].events = {};
                    }
                    if(window.sent[result.UUID].events.onComplete && typeof(window.sent[result.UUID].events.onComplete == "function") && result.response === "ok") {
                        console.log("window.sent event ONCOMPLETE detected");
                        window.sent[result.UUID].events.onComplete(result);
                    }
                    if(result.response === "nok") {
                        if(window.sent[result.UUID].events.onError) { window.sent[result.UUID].events.onError(result); }
                    }
                    console.log("deleting requet replied " + result.UUID, window.sent[result.UUID]);
                    delete window.sent[result.UUID];
                }else{
                    console.log("ERROR window.sent did not detect UUID " + result.UUID);
                }

                return(result.response);

            }.bind(this),
            close : function (event) {
                console.log("window.salesboard.api.onClose: "+ JSON.stringify(event));
                this.connected = false;
                window.SalesBoardSocket = window.NotConnectedSocket;
            }.bind(this)
        };

        this.send = function(func, params) {
            params = params || {};
            if(this.connection && this.connected) {
                var thisID =  Math.uuid();

                window.sent[thisID] = {
                    UUID: thisID,
                    method: func,
                    parameters: params.parameters,
                    events: params.events,
                    responseReceived: false,
                    response: false
                };

                this.connection.send("api"+JSON.stringify({ "method": func, "parameters": params.parameters, "UUID":thisID}));

                console.log("Sent command ["+thisID+"] " + func + " | "+ JSON.stringify(params));
            } else {
                alert("Connection lost, re-establishing!");
                this.connect({ onOpen: function() { this.send(func, params) } });
            }
            return thisID;
        }.bind(this);

        // send system msg to API server

        this.sysmsg = function(msg) {
            if(this.connection && this.connected) {
                this.connection.send("system"+JSON.stringify({"method": "message", "message": "Connection done! v"+this.options.version, "UUID" : Math.uuid()})) ;
            }
        }.bind(this);

        console.log("Created custom android connection");
        this.connection = {
            connect: function() {
                console.log("APIAndroid.connect()");
                xsocket.events.open();
            },
            disconnect: function(args) {
                console.log("APIAndroid.disconnect("+args+")");
                xsocket.events.close(args);
            },
            send: function(args) {
                console.log("APIAndroid.send("+args+")");
                try{
                    window.APIAndroid.send(args);
                }catch(err){
                    //Ignoring
                }

            },
            // android calls this directly on webview.loadurl;
            // from android: call myWebview.loadUrl("javascript:window.SalesBoardSocket.connection.onMessage(encodedMessage)")
            onMessage: function(args) {
                console.log("APIAndroid.onMessage("+args+")");
                xsocket.events.message(args);
            }
        };
        //XXX REQUIRED otherwise on events will not work!
        window.shouldconnect = true;

        return this;
    }
};

/**
 * Generic salesboard addon error logging.
 */
window.onerror = function(message, uri, line) {
    uri = (!uri || uri == 'undefined' || typeof uri == 'undefined' )? window.location.href : uri;
    if(window.SalesBoardSocket == window.NotConnectedSocket) { // postpone until we have a connection.
        var logs = localStorage.getItem('errorQueue');
        logs = (typeof logs == "string")  ? JSON.parse(logs) : [];
        if(typeof logs != 'array') logs = [];
        logs.push({time: new Date().getTime(), 'message': message, 'uri': uri, 'line': line });
        localStorage.setItem('errorQueue', JSON.stringify(logs));
    } else {
        alert('addon.error ' + JSON.stringify({ time: new Date().getTime(), message: message, uri: uri, line: line }));
        console.error('addon.error ' + JSON.stringify({ time: new Date().getTime(), message: message, uri: uri, line: line }));
        // window.salesboard.api.stats.log({ action: 'addon.error', value:  { time: new Date().getTime(), message: message, uri: uri, line: line }});
    }
}

/**
 * Generic salesboard addon error logging and alerting.
 */
window.oldAlert = window.alert;

window.alert = function(message) {
    if(window.SalesBoardSocket == window.NotConnectedSocket) { // postpone until we have a connection.
        oldAlert(message);
    } else {
        window.salesboard.api.system.alert({
            'title': 'Salesboard',
            'message': message,
            'buttonTitle': 'OK'
        }, {});
    }
}

window.SalesBoardSocket = window.NotConnectedSocket = {
    send: function() {
        window.salesboard.connect({});
        alert("You do not seem to be connected. Please connect to a valid API endpoint before sending commands.");
    }
};

Function.prototype.bind = function(scope) {
    var _function = this;
    return function() {
        return _function.apply(scope, arguments);
    };
};

Math.uuid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    }).toUpperCase();
};