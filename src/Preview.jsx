const React = require('react')
const _ = require('lodash')
const Station = require('./Station')
const {getAqiLevelColor} = require('./utils')


const containerStyles = {
  textAlign: 'center',
  paddingTop: '1rem',
  height: '100%'
}

const titleStyles = {
  margin: '0 0 1rem',
  fontSize: '2.4rem'
}

const listStyles = {
  padding: '0 0 0 2rem',
  textAlign: 'left',
  listStyle: 'none'
}

const commonBannerStyles = {
  width: '30%',
  margin: '0 auto',
  padding: '0.8rem',
  fontSize: '2rem',
  border: '1px solid #eee',
  borderRadius: '6px',
  color: '#fff'
}

const dateTimeStyles = {
  fontSize: '0.6rem'
}

function renderStation(aqiList) {
  return _(aqiList).drop().compact().map((aqiData, index) => <Station key={index} aqiData={aqiData} />).value()
}

module.exports = (props) => {
  const {averageAqi, fullCityName, aqiList, updatedTime} = props
  const bannerStyles = _.merge({}, commonBannerStyles, {
    backgroundColor: getAqiLevelColor(averageAqi)
  })

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>{fullCityName}</h1>
      <div>
        <div style={bannerStyles}>{averageAqi}</div>
        <div style={dateTimeStyles}>Update on {updatedTime}</div>
      </div>
      <ul style={listStyles}>
        {renderStation(aqiList)}
      </ul>
    </div>
  )
}
