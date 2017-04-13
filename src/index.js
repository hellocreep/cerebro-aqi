const _ = require('lodash')
const React = require('react')

const Preview = require('./Preview')
const icon = require('./plugin-icon.png')

const id = 'aqi';
const API_BASE_URL = 'https://wind.waqi.info/nsearch/full/'
const SITE_URL = 'http://aqicn.org/'
const API_FEED_URL_TEMPLTE =  _.template('https://api.waqi.info/api/feed/@<%= cityId%>/obs.en.json')


function fetchCityId(cityName) {
  return fetch(`${API_BASE_URL}${encodeURIComponent(cityName)}`)
  .then(res => res.json())
  .then(res => {
    return _.get(res, 'results[0].x')
  })
}

function fetchAiqData(cityId) {
  return fetch(API_FEED_URL_TEMPLTE({cityId})).then(res => res.json())
}

const fn = ({term, display, actions}) => {
  let match = term.toLowerCase().match(/^aqi\s(.+)$/)

  if (match) {
    const cityName = match[1];

    display({
      id,
      icon,
      title: `Searching for ${cityName}'s AQI...`
    })

    fetchCityId(cityName).then(cityId => {
      fetchAiqData(cityId).then(res => {
        const aqiInfo = _.get(res, 'rxs.obs[0].msg', {})
        const averageAqi = _.get(aqiInfo, 'aqi', '')
        const fullCityName = _.get(aqiInfo, 'city.name', '')
        const updatedTime = _.get(aqiInfo, 'time.s.en.time', '')

        display({
          id,
          icon,
          title: `AQI of ${fullCityName}`,
          onSelect: () => actions.open(`${SITE_URL}city/${encodeURIComponent(fullCityName)}`),
          getPreview: () => (
            <Preview
              averageAqi={averageAqi}
              fullCityName={fullCityName}
              aqiList={aqiInfo.nearest}
              updatedTime={updatedTime}
            />
          )
        })
      })
    })
  }
};

module.exports = {
  icon,
  fn: _.debounce(fn, 500),
  name: 'Air Quality Index',
  keyword: 'aqi'
}
