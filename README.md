# TitonDB
Simple, beginer-friendly JSON based database.

![TitonDB logo](https://imgur.com/Fcytnjf.png)

> This package is in the early access phase.
## Installation
```
npm i titondb
```
## Example
```js
const TitonDB = require('TitonDB')

// Initialise database
let db = new TitonDB('db.json')

// Set "money -> euro" to 50
db.set('money.euro', 50);

// Get "money -> euro" value
db.get('money.euro'); // 50

// Add 10 to "money -> euro"
db.add('money.euro', 10);

// Subtract 10 from "money -> euro"
db.subtract('money.euro', 10); 

// Get values larger than 20 from "money"
db.filter('money', 'largerThan', 20) // { usd: 40, euro: 50 }

// Get values smaller than 20 from "money"
db.filter('money', 'smallerThan', 20) // { pln: 15 }

// Get values equal 40 from "money"
db.filter('money', 'equal', 40) // { usd: 40 }

// Get highest value from "money"
db.filter('money', 'max') // { euro: 50 }

// Get lowest value from "money"
db.filter('money', 'min') // { pln: 15 }

// Delete "money" from database
db.delete('money');

// Clear whole database
db.clear();

// Get database as JSON
db.json();

```
