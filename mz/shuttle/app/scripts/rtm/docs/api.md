MZ RTM JavaScript SDK exposes 2 abstractions: `RTM` and `Channel`. First you initialize an instance of `RTM` class with MZ RTM, after that you create the necessary `Channels` that you want to subscribe and/or publish to. Please find more information below.
<br>

### [Channel class](#channel)

Implements core business logic of working with a given RTM Channel, which allows
you to subscribe/publish to a Channel and handle various lifecycle events.

* **[publish(message, [isConfirmationRequired])](#channel-publishmessage-isconfirmationrequired)**

    Publishes a message into a Channel.

* **[subscribe([extra], [isConfirmationRequired])](#channel-subscribeextra-isconfirmationrequired)**

    Subscribes to receive all messages from a Channel.

* **[unsubscribe([isConfirmationRequired])](#channel-unsubscribeisconfirmationrequired)**

    Unsubscribes from all events within a Channel.

* **[close([waitUnsubscribeConfirmation])](#channel-closewaitunsubscribeconfirmation)**

    Unsubscribes from all events within this Channel and removes all handlers.

* **[on(event, fn)](#channel-onevent-fn)**

    Attaches a handler function, which is invoked when a certain action takes place.

* **[off([event], [fn])](#channel-offevent-fn)**

    Detaches handler function(s) registered previously.

### [RTM class](#rtm)

Handles WebSocket RTM connection management and allows you to create Channels
to work with data flows.

* **[create(appKey, [options])](#rtm-createappkey-options)**

    Creates an instance of this class and returns the instance reference.

* **[createChannel(name)](#rtm-createchannelname)**

    Creates an instance of a Channel class with the specified name.

* **[createChannel(name)](#rtm-createchannelname)**

    Gets an instance of a Channel with the specified name.

* **[open()](#rtm-open)**

    Initiates WebSocket connection with MZ RTM.

* **[close()](#rtm-close)**

    Terminates connection with RTM, clears all subscriptions and removes
all Channels.

* **[on(event, fn)](#rtm-onevent-fn)**

    Attaches a handler function, which is invoked when a certain action takes place.

* **[off([event], [fn])](#rtm-offevent-fn)**

    Detaches handler function(s) registered previously.

<br>

<a name="channel"></a>
## Channel class

Implements core business logic of working with a given RTM Channel, which allows
you to subscribe/publish to a Channel and handle various lifecycle events.
You are **not** supposed to instantiate this class via constructor call,
please use "createChannel" function of the Connection class instance instead.

```javascript
    // create RTM class instance
    var connection = MZ.RTM.create("your-appkey");
    // create new Channel with "your-channel" name
    var channel = connection.createChannel("your-channel");
```

<br>

<a name="channel-publishmessage-isconfirmationrequired"></a>
### publish(message, [isConfirmationRequired])

Publishes a message into a Channel.

#### Arguments

* **message** &nbsp; ``JSON`` &nbsp; 

    <p>JSON that represents a message you want to publish.</p>

* **isConfirmationRequired** &nbsp; ``Boolean`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp;  Default value: ``false``

    <p>This parameter defines if a message delivery confirmation should be requested<br />from RTM. By default no confirmation is requested. Confirmation is typically<br />requested in case a few actions depend on each other and you want to make<br />sure the first action is completed before starting the next one. SDK awaits<br />confirmation from RTM for 10 seconds, after that the request is considered<br />a failure.</p>

#### Exceptions

* ``TypeError`` &nbsp; In case mandatory parameter is missing or invalid.

#### Return value

``Promise``

<p>Promise object that resolves as soon as the action is completed and rejects<br />in case an error received or the confirmation from RTM timed out (if you requested<br />a confirmation).</p>

#### Example

```javascript
    var connection = MZ.RTM.create("your-appkey");
    var channel = connection.createChannel("your-channel");
    // publish with no confirmation (default)...
    channel.publish({key: value});
    // publish with confirmation...
    channel.publish({key: value}, true)
        .then(function() {
            // everything is ok
        }, function() {
            // operation failed or no confirmation seen within 10 seconds
        });
```

<br>

<a name="channel-subscribeextra-isconfirmationrequired"></a>
### subscribe([extra], [isConfirmationRequired])

Subscribes to receive all messages from a Channel.
Note: you can skip "next" argument and use true/false as the first
argument value to define whether action confirmation is required.

#### Arguments

* **extra** &nbsp; ``Object`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp; 

    <p>The set of additional parameters to be included into RTM &quot;subscribe&quot; call body.</p>

* **extra.next** &nbsp; ``String`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp; 

    <p>Last known channel stream position prior to subscribe operation. The &quot;next&quot; field<br />value can be extracted from the RTM data frames.</p>

* **extra.history** &nbsp; ``Object`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp; 

    <p>Object that defines which historical data RTM should send to the client after subsription.</p>

* **extra.history.max_count** &nbsp; ``Number`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp; 

    <p>Max amount of last messages to be sent by RTM to the client after subscription.</p>

* **extra.history.max_age** &nbsp; ``Number`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp; 

    <p>Max age of messages to be sent by RTM to the client after subscription.</p>

* **isConfirmationRequired** &nbsp; ``Boolean`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp;  Default value: ``false``

    <p>This parameter defines if &quot;subscribe&quot; action confirmation should be requested<br />from RTM. By default no confirmation is requested. Confirmation is typically<br />requested in case a few actions depend on each other and you want to make<br />sure the first action is completed before starting the next one. SDK awaits<br />confirmation from RTM for 10 seconds, after that the request is considered<br />a failure.</p>

#### Return value

``Promise``

<p>Promise object that resolves as soon as the action is completed and rejects<br />in case an error received or the confirmation from RTM timed out (if you requested<br />a confirmation).</p>

#### Example

```javascript
    var connection = MZ.RTM.create("your-appkey");
    var channel = connection.createChannel("your-channel");
    // subscribe with no confirmation (default)...
    channel.subscribe();
    // subscribe with next and confirmation...
    channel.subscribe({"next": 7862334}, true)
        .then(function() {
            // everything is ok
        }, function() {
            // operation failed or no confirmation seen within 10 seconds
        });
    // subscribe with confirmation only...
    // (note: the function allows you to skip the first argument)
    channel.subscribe(true)
        .then(function() {
            // everything is ok
        }, function() {
            // operation failed or no confirmation seen within 10 seconds
        });
```

<br>

<a name="channel-unsubscribeisconfirmationrequired"></a>
### unsubscribe([isConfirmationRequired])

Unsubscribes from all events within a Channel.

#### Arguments

* **isConfirmationRequired** &nbsp; ``Boolean`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp;  Default value: ``false``

    <p>This parameter defines if &quot;unsubscribe&quot; action confirmation should be requested<br />from RTM. By default no confirmation is requested. Confirmation is typically<br />requested in case a few actions depend on each other and you want to make<br />sure the first action is completed before starting the next one. SDK awaits<br />confirmation from RTM for 10 seconds, after that the request is considered<br />a failure.</p>

#### Return value

``Promise``

<p>Promise object that resolves as soon as the action is completed and rejects<br />in case an error received or the confirmation from RTM timed out (if you requested<br />a confirmation).</p>

#### Example

```javascript
    var connection = MZ.RTM.create("your-appkey");
    var channel = connection.createChannel("your-channel");
    // unsubscribe with no confirmation (default)...
    channel.unsubscribe();
    // unsubscribe with confirmation...
    channel.unsubscribe(true)
        .then(function() {
            // everything is ok
        }, function() {
            // operation failed or no confirmation seen within 10 seconds
        });
```

<br>

<a name="channel-closewaitunsubscribeconfirmation"></a>
### close([waitUnsubscribeConfirmation])

Unsubscribes from all events within this Channel and removes all handlers.
The difference with "unsubscribe" function is that the "close" function completely
terminates the subscription, i.e. you are not able to use "subscribe" after that
(you'll need to create a Channel again using connection.createChannel call),
whereas "unsubscribe" call allows you to "subscribe" to the same channel again later.

#### Arguments

* **waitUnsubscribeConfirmation** &nbsp; ``Boolean`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp;  Default value: ``true``

    <p>This parameter indicates whether <a href="#channel-unsubscribeisconfirmationrequired">unsubscribe</a><br />operation will be send with confirmation or not.</p>

#### Return value

``Promise``

<p>Promise object that resolves as soon as all actions are completed and rejects in case<br />the close function was called while connection was in closed state.</p>

#### Example

```javascript
    var connection = MZ.RTM.create("your-appkey");
    var channel = connection.createChannel("your-channel");
    // closing a channel with confirmation of unsubscribe operation (default)...
    channel.close();
    // closing a channel with no confirmation of unsubscribe operation...
    channel.close(false);
```

<br>

<a name="channel-onevent-fn"></a>
### on(event, fn)

Attaches a handler function, which is invoked when a certain action takes place.
Can be invoked several times to attach multiple handlers.

#### Arguments

* **event** &nbsp; ``String`` &nbsp; 

    <p>Name of the event a given handler should be attached to. You can register your<br />function to be execute in the following cases:</p><ul>
<li>when a new event appears in a Channel (use &quot;data&quot; as argument value)</li>
<li>when channel is closed via <a href="#channel-closewaitunsubscribeconfirmation">close</a><br />method or when whole connection were closed (use &quot;close&quot;)</li>
<li>when SDK handles the error occurences and going to try to re-establish<br />connection (use &quot;beforeRetry&quot;)</li>
<li>when SDK tries to re-establish connection (use &quot;retry&quot;)</li>
<li>when an error within a Channel is occurred (use &quot;error&quot; for that case)</li>
</ul>

* **fn** &nbsp; ``Function`` &nbsp; 

    <p>Handler function to be attached and executed once a certain action took place.</p>

#### Exceptions

* ``TypeError`` &nbsp; In case mandatory parameters are missing or invalid.

#### Return value

``Channel``

<p>Channel instance object.</p>

#### Example

```javascript
    var connection = MZ.RTM.create("my-appkey");
    var channel = connection.createChannel("your-channel");
    // register an "error" handler...
    channel.on("error", function() {
        // your handler code here
    });
    // register a function to be executed if there is data
    // coming for this channel...
    channel.on("data", function() {
        // your handler code here
    })
```

<br>

<a name="channel-offevent-fn"></a>
### off([event], [fn])

Detaches handler function(s) registered previously.

#### Arguments

* **event** &nbsp; ``String`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp; 

    <p>Event name. Omit this parameter if you want to detach<br />all listeners for all events.</p>

* **fn** &nbsp; ``Function`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp; 

    <p>Listener function that you want to detach. Omit this parameter<br />if you want to detach all listeners for a given event name.</p>

#### Exceptions

* ``TypeError`` &nbsp; In case event name type is invalid.

#### Return value

``Channel``

<p>Channel instance object.</p>

#### Example

```javascript
    var connection = MZ.RTM.create("my-appkey");
    var channel = connection.createChannel("your-channel");
    var errorHandler = function() {
        // your handler code here
    };
    // register an "error" handler...
    channel.on("error", errorHandler);
    // detach handler when you no longer need it...
    channel.off("error", errorHandler);
    // detach all "error" handlers...
    channel.off("error");
    // detach all handlers...
    channel.off();
```

<br>

<a name="rtm"></a>
## RTM class

Handles WebSocket RTM connection management and allows you to create Channels
to work with data flows.

```javascript
    // create RTM class instance
    var connection = MZ.RTM.create("your-appkey");
    // create new Channel with "your-channel" name
    var channel = connection.createChannel("your-channel");
```

<br>

<a name="rtm-createappkey-options"></a>
### create(appKey, [options])

Creates an instance of this class and returns the instance reference.
The function provides additional syntax of how the MZ.RTM class can be
instantiated.

#### Arguments

* **appKey** &nbsp; ``String`` &nbsp; 

    <p>Application key used for a given connection.<br />This field is used to identify customer account within MZ RTM system.</p>

* **options** &nbsp; ``Object`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp; 

    <p>Additional options used to establish connection or define extra rules for Connection object.</p>

* **options.url** &nbsp; ``String`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp;  Default value: ``"wss://api.platform.machinezone.com/v1"``

    <p>Defines RTM cluster endpoint location, which should be used for a given Connection.</p>

* **options.maxRetries** &nbsp; ``Number`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp;  Default value: ``10``

    <p>Defines max reconnect attempts to be performed in a row.</p>

* **options.maxRetriesTimeout** &nbsp; ``Number`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp;  Default value: ``30``

    <p>Defines max timeout (in seconds) between reconnect attempts.<br />Note: timeout keeps increasing with each failed attempt, but it doesn&#39;t exceed this number.</p>

#### Exceptions

* ``TypeError`` &nbsp; In case mandatory parameters are missing or invalid.

#### Return value

``Object``

<p>Reference to the Connection class instance created.</p>

#### Example

```javascript
    // instantiation via static "create" method:
    var connection = MZ.RTM.create("your-appkey");
```

<br>

<a name="rtm-createchannelname"></a>
### createChannel(name)

Creates an instance of a Channel class with the specified name.
Note: if you want to subscribe to multiple Channels, you should invoke this function
multiple times with the necessary channel names.

#### Arguments

* **name** &nbsp; ``String`` &nbsp; 

    <p>Channel name.</p>

#### Exceptions

* ``TypeError`` &nbsp; In case mandatory parameter is missing or invalid.

* ``RangeError`` &nbsp; In case channel with given name already exists within connection.

#### Return value

``Object``

<p>An instance of the Channel class that represents an RTM Channel.<br />This instance can be used to perform Channel operations such as subscribe/publish.</p>

#### Example

```javascript
    var connection = MZ.RTM.create("your-appkey");
    var channel = connection.createChannel("your-channel-name");
```

<br>

<a name="rtm-createchannelname"></a>
### createChannel(name)

Gets an instance of a Channel with the specified name.

#### Arguments

* **name** &nbsp; ``String`` &nbsp; 

    <p>Channel name.</p>

#### Return value

``Object``

<p>An instance of the Channel class that represents an RTM Channel in case<br />it exists. Otherwise returns undefined.</p>

#### Example

```javascript
    var connection = MZ.RTM.create("your-appkey");
    var channel = connection.createChannel("your-channel-name");
    channel === connection.getChannel("your-channel-name"); // true
```

<br>

<a name="rtm-open"></a>
### open()

Initiates WebSocket connection with MZ RTM.
Note: you do *not* need to call it explicitly, unless you closed
connection using "close" function manually. In other cases connection is established
by SDK automatically during the first subscribe or publish call.

#### Return value

``Promise``

<p>Promise object that resolves when connection is in &quot;open&quot; state</p>

#### Example

```javascript
    var connection = MZ.RTM.create("your-appkey");
    // at some point the "close" function was called explicitly and connection
    // was terminated, so let&#39;s connect again...
    connection.open();
```

<br>

<a name="rtm-close"></a>
### close()

Terminates connection with RTM, clears all subscriptions and removes
all Channels. Use this method when you want to shut down all RTM interactions
spawned by this instance of the connection.

#### Return value

``Promise``

<p>Promise object that resolves as soon as all actions are completed and rejects in case<br />the close function was called while connection was in closed state.</p>

#### Example

```javascript
    var connection = MZ.RTM.create("your-appkey");
    connection.close();
```

<br>

<a name="rtm-onevent-fn"></a>
### on(event, fn)

Attaches a handler function, which is invoked when a certain action takes place.
Can be invoked several times to attach multiple handlers.

#### Arguments

* **event** &nbsp; ``String`` &nbsp; 

    <p>Name of the event a given handler should be attached to. You can register your<br />function to be executed in the following cases:</p><ul>
<li>when connection is opened (use &quot;open&quot; as argument value)</li>
<li>when connection is closed (use &quot;close&quot;)</li>
<li>when SDK handles the error occurences and going to try to re-establish<br />connection (use &quot;beforeRetry&quot;)</li>
<li>when SDK tries to re-establish connection (use &quot;retry&quot;)</li>
<li>when an error with connection has occurred (use &quot;error&quot; for that case)</li>
</ul>

* **fn** &nbsp; ``Function`` &nbsp; 

    <p>Handler function to be attached and executed once a certain action took place.</p>

#### Exceptions

* ``TypeError`` &nbsp; In case mandatory parameters are missing or invalid.

#### Return value

``RTM``

<p>RTM instance object.</p>

#### Example

```javascript
    var connection = MZ.RTM.create("my-appkey");
    // register an "error" handler...
    connection.on("error", function() {
        // your handler code here
    });
    // register a function to be executed once connection is opened...
    connection.on("open", function() {
        // your handler code here
    });
```

<br>

<a name="rtm-offevent-fn"></a>
### off([event], [fn])

Detaches handler function(s) registered previously.

#### Arguments

* **event** &nbsp; ``String`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp; 

    <p>Event name. Omit this parameter if you want to detach<br />all listeners for all events.</p>

* **fn** &nbsp; ``Function`` &nbsp;  | &nbsp; Optional: ``YES`` &nbsp; 

    <p>Listener function that you want to detach. Omit this parameter<br />if you want to detach all listeners for a given event name.</p>

#### Exceptions

* ``TypeError`` &nbsp; In case event name type is invalid.

#### Return value

``RTM``

<p>RTM instance object.</p>

#### Example

```javascript
    var connection = MZ.RTM.create("my-appkey");
    // register an "error" handler...
    var errorHandler = function() {
        // your handler code here
    };
    connection.on("error", errorHandler);
    // detach handler when you no longer need it...
    connection.off("error", errorHandler);
    // detach all "error" handlers...
    connection.off("error");
    // detach all handlers...
    connection.off();
```

<br>

