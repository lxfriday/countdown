/**
 * countdown class
 *
 * @author lxfriday
 * @param leftTime {number}  time(second) left for countdown
 * @param i {number} period time(second) to execute `onDown`
 */
function CountDown(leftTime, i) {
  var self = this;
  // timer
  self.timer = null;

  if (leftTime === undefined) {
    throw new Error('at least one param for countdown steper to execute');
  }

  // init time
  self.initialLeftTime = +leftTime;
  // temp self subtract
  self.availableTime = +leftTime;
  // period interval
  self.interval = i || 1;
};

/**
 * countdown executor
 */
CountDown.prototype.steper = function () {
  var self = this;
  if (self.availableTime > 0) {
    self.timer = setInterval(function () {

      /**
       * hack callback
       */
      self.onDown(self.availableTime);

      self.availableTime -= self.interval;
      if (self.availableTime < 0) {
        clearInterval(self.timer);
      }
    }, self.interval * 1000);
  }
};

/**
 * called every period, hack func
 */
CountDown.prototype.onDown = function (availableTime) { };

/**
 * pause countdown temporarily
 */
CountDown.prototype.pause = function () {
 clearInterval(this.timer);
};

/**
 * stop countdown
 */
CountDown.prototype.stop = function () {
  this.availableTime = 0;
  clearInterval(this.timer);
};

/**
 * start countdown
 */
CountDown.prototype.start = function () {
  this.steper();
};

/**
 * reset the available time to initial time
 */
CountDown.prototype.reset = function () {
  this.availableTime = this.initialLeftTime;
};

/**
 * restart countdown using the initial leftTime
 */
CountDown.prototype.restart = function () {
  this.reset();
  this.start();
};

module.exports = CountDown;
