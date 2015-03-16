#ConfM

**simple Node.js server-side config solution**

## Feature

+ read `json` format file as config
+ watch config file changes, no need to restart your server

## Installation

	npm install confm

## Usage

	var config = require('confM').create('conf/global.json);
	config.get('a'); // 1
	config.get('b', 'c'); // 2
	config.getAll(); // {"a":1,"b":{"c":2}}

---
global.json

	{
		"a": 1,
		"b": {
			"c": 2
		}
	}

## Run Tests

	git clone https://github.com/MaxLee1994/confM.git confM
	cd confM
	mocha tests/confM-integ.js
