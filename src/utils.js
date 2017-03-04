const _ = require('lodash')


const aqiLevels = {
  none: {
    range: [Number.NEGATIVE_INFINITY, 0],
    color: '#9E9E9E'
  },
  good: {
    range: [0, 50],
    color: '#009966'
  },
  moderate: {
    range: [51, 100],
    color: '#ffde33'
  },
  unhealthyForSensitiveGroups: {
    range: [101, 150],
    color: '#ff9933'
  },
  unhealthy: {
    range: [151, 200],
    color: '#cc0033'
  },
  veryUnhealthy: {
    range: [201, 300],
    color: '#660099'
  },
  hazardous: {
    range: [300, Number.POSITIVE_INFINITY],
    color: '#7e0023'
  }
}

function getAqiLevelColor(aqi) {
  if (_.isNaN(Number.parseInt(aqi))) return aqiLevels.none.color

  return _.find(aqiLevels, level => _.inRange(aqi, ...level.range)).color
}

exports.getAqiLevelColor = getAqiLevelColor
