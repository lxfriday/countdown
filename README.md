# countdown

javascript auto countdown util class

## install

```bash
npm i @lxfriday/countdown -S
# or
yarn add @lxfriday/countdown
```

## params

### constructor

- `leftTime` `{number}` `required` time(second) left for countdown
- `i` `{number}` period time(second) to execute `func`


### CountDown.prototype.onDown
called every period, hack func

```js
// use

CountDown.prototype.onDown = function (leftTime) {
    console.log(leftTime);
}

```

### CountDown.prototype.start
start countdown

### CountDown.prototype.pause
pause countdown temporarily

### CountDown.prototype.stop
stop countdown

### CountDown.prototype.reset
reset the available time to initial time

### CountDown.prototype.restart
restart countdown using the initial leftTime

## usage

```js
var CountDown = require('@lxfriday/countdown');

var countdown1 = new CountDown(180);
countdown1.onDown = function (leftTime) {
    console.log('time now left: ' + leftTime + ' second(s)');
}

countdown1.start();

// time now left: 180 seconds(s)
// time now left: 179 seconds(s)
// time now left: 178 seconds(s)
// time now left: 177 seconds(s)

countdown1.pause(); // termporarily pause

countdown1.start();

// time now left: 176 seconds(s)
// time now left: 175 seconds(s)

countdown1.stop(); // now stoped

// if you want to restart, call reset and start

countdown1.reset();
countdown1.start();

// 180
// 179 ...

// or call restart

countdown1.restart();

// 180
// 179 ...

```
