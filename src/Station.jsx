const React = require('react')
const _ = require('lodash')
const {getAqiLevelColor} = require('./utils')

const stattionStyles = {
  marginBottom: '0.5rem',
  fontSize: '0.8rem'
}

const commonApiNumberStyles = {
  marginRight: '0.2rem',
  padding: '0.1rem 0.2rem',
  display: 'inline-block',
  width: '1.4rem',
  textAlign: 'center',
  color: '#fff'
}

const Station = ({aqiData}) => {
  const aqiNumber = _.get(aqiData, 'aqi', '')
  const aqiNumberStyles = _.merge({}, commonApiNumberStyles, {
    backgroundColor: getAqiLevelColor(aqiNumber)
  })

  if (_.isEmpty(aqiNumber)) return null

  const cityName = _.get(aqiData, 'name', '')

  return (
    <li style={stattionStyles}>
      <span style={aqiNumberStyles}>{aqiNumber}</span>
      {cityName}
    </li>
  )
}

module.exports = Station
