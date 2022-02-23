[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/owlbear-rodeo/page-icon/workflows/Tests/badge.svg)](https://github.com/owlbear-rodeo/page-icon/actions?query=workflow%3ATests)

# Page Icon

A library to find the highest resolution website logo for a given url.

This a Javascript implementation of http://stackoverflow.com/a/22007642/5076225.

## Installation

Requires Node.js >= 16.

```bash
$ npm install --save @owlbear-rodeo/page-icon
```

## Usage

```javascript
const pageIcon = require('@owlbear-rodeo/page-icon');

const URL = 'https://www.facebook.com/';
pageIcon(siteUrl)
    .then(function(icon) {
        // do things with icon object
        console.log(icon);
    })
    .catch(error => {
        console.error(error);
    });
});
```

#### Example Icon Object

```javascript
{ 
    source: 'https://www.facebook.com/apple-touch-icon.png',
    name: 'www.facebook.com',
    data: <Buffer 89 50 4e ... >,
    size: 1779,
    ext: '.png',
    mime: 'image/png' 
}
```

## Tests

```bash
$ npm test
```

## License

MIT
