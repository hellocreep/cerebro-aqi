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
  const aqiNumber = _.get(aqiData, 's.a', '')
  const aqiNumberStyles = _.merge({}, commonApiNumberStyles, {
    backgroundColor: getAqiLevelColor(aqiNumber)
  })

  if (_.isEmpty(aqiNumber)) return null

  const cityName = _.get(aqiData, 's.n[1]', '')
  const cityNameAlt = _.get(aqiData, 's.n[0]', '')

  return (
    <li style={stattionStyles}>
      <span style={aqiNumberStyles}>{aqiNumber}</span>
      {`${cityName} ${cityNameAlt}`}
    </li>
  )
}

module.exports = Station
