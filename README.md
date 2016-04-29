# hapi-lol
A super light-weight Node.js wrapper for the Riot Games League of Legends API.

## Rationale
Part of the terms of use for Riot Games' League of Legends API is that their API key must be protected, meaning that their API cannot be accessed directly by popular MVVM JavaScript frameworks such as Angular.js, Ember.js and Polymer.js. To address this, I have created a very simple wrapper which will allow front-end application developers to focus on creating awesome user experiences, rather than setting up a back-end server to perform API requests.

## Installation
hapi-lol is meant to be an easy-to-install first step for developers wanting to build awesome applications Riot's API.
To get started, you'll need to install Node.js first and register for a Riot Games API key.
* Install Node: https://nodejs.org/en/download/
* Get an API Key: https://developer.riotgames.com/

Once node is installed, clone this repository into your project directory using git.

```git clone https://github.com/ianbitts/hapi-lol.git ./```

Then, install Node.js dependencies using

```npm install```

Once all dependencies have been installed, you can launch the application using 

```npm start```

By default, this will get the server running on http://localhost:3000/

## Configuration
hapi-lol requires a very small amount of configuration in order to begin proxying requests to the Riot API.
To get started, open the file ```config.js``` in the root directory of the project. You should see the following code:

```
module.exports = {
    apikey: "",
    serverName: "localhost",
    port: "3000",
    region: "na",
    appPath: "./public/app",
    useCache: true,
    cacheTTL: 30, // seconds
}
```

Simply change the properties for apikey, serverName, port and region as neccessary. By default, hapi-lol uses the ```public/app```
directory as the starting point for your front end application. Simply set up the included index.html file to load the JavaScript MVVM
framework of your preference!

You can also configure the cache, provided by the node-cache module. By default, all calls to the League of Legends API will be cached
for thirty seconds. If the same endpoint is accessed with the same query, the server will return a cached value rather than issuing
another request.

## Liscence
Copyright (c) 2016 RURAL SOURCING INC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
