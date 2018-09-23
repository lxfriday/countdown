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

  // at least one param
  if (!arguments.length) {
    throw new Error('at least one param for countdown steper to execute');
  }

  // init time
  self.initialLeftTime = +leftTime;
  // temp self subtract
  self.availableTime = +leftTime;
  // cached time when paused
  self.cachePauseTime = +leftTime;
  // period interval
  self.interval = i || 1;
}

/**
 * countdown executor
 */
CountDown.prototype.steper = function () {
  var self = this;
  if (self.availableTime > 0) {
    function func() {
      self.timer = setTimeout(function () {

        self.availableTime -= self.interval;

        /**
         * hack callback
         */
        self.onDown(self.availableTime);

        if (self.availableTime > 0) {
          func();
        }
      }, self.interval * 1000);
    }

    func();
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
  this.cachePauseTime = this.availableTime;
  this.availableTime = 0;
  clearTimeout(this.timer);
};

/**
 * stop countdown
 */
CountDown.prototype.stop = function () {
  this.availableTime = 0;
  this.cachePauseTime = 0;
  clearTimeout(this.timer);
};

/**
 * start countdown
 */
CountDown.prototype.start = function () {
  this.availableTime = this.cachePauseTime;
  clearTimeout(this.timer);
  this.steper();
};

/**
 * reset the available time to initial time
 */
CountDown.prototype.reset = function () {
  this.availableTime = this.initialLeftTime;
  this.cachePauseTime = this.initialLeftTime;
  clearTimeout(this.timer);
};

/**
 * restart countdown using the initial leftTime
 */
CountDown.prototype.restart = function () {
  this.reset();
  this.start();
};

module.exports = CountDown;
