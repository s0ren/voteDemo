/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
        app.startApp();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    startApp: function()
    {

        getContent();

        function getContent()
        {
            var req = new XMLHttpRequest();
            req.onreadystatechange = function() {
                if (req.readyState==4 && (req.status==200 || req.status==0)) {
//                    console.log("POST Response: " + req.responseText);
                    console.log("GET Response: " + req.responseText);

                    var respJson = JSON.parse(req.responseText);

                    var liste = document.getElementById('afstemningsliste');
                    var lItem = liste.querySelector('.afstemning');
                    liste.removeChild(lItem);

                    for(var q in respJson.questions)
                    {

                        console.log(' ' + q + ' : ' + respJson.questions[q]);
                        var newItem = lItem.cloneNode(true);
                        newItem.innerHTML = "<p>" + respJson.questions[q] + "</p>";

                        function clicker(id) {
                            return function () {
                                console.log("Goto q = " + id);
                                self.location = "afstemning.html?qid=" + id;
                            }
                        }

                        newItem.addEventListener('click', clicker(q) )
                        liste.appendChild(newItem);
                    }
                }
            };

            var t = new Date().getTime();  // Just to foil any caching
            //req.open("POST", "localhost:8000/vote.php?t=" + t, true);  // async
            //req.open("GET", "http://localhost:8080/vote.php?t=" + t, true);  // async
            req.open("GET", "http://grahn.dk/darup/vote.php?t=" + t, true);  // async
            req.setRequestHeader('Content-type','application/json; charset=utf-8');
            req.setRequestHeader('X-PINGOTHER', 'pingpong');

            // var postContent = JSON.stringify({
            //     id:t,
            //     method:"misc.log",
            //     params:[{log:"POST Test"}]
            // });

            //req.send(postContent);
            req.send();
        }

    }


};
