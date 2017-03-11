const _ = require('lodash')
const React = require('react')

const Preview = require('./Preview')
const icon = require('./plugin-icon.png')

const id = 'aqi';
const API_BASE_URL = 'https://wind.waqi.info/nsearch/full/'
const SITE_URL = 'http://aqicn.org/'


function fetchAiqData(cityName) {
  return fetch(`${API_BASE_URL}${encodeURIComponent(cityName)}`).then(res => res.json())
}

const fn = ({term, display, actions}) => {
  let match = term.match(/^aqi\s(.+)$/)

  if (match) {
    const cityName = match[1];

    display({
      id,
      icon,
      title: `Searching for ${cityName}'s AQI...`
    })

    fetchAiqData(cityName).then(res => {
      const averageAqi = _.get(res, 'results[0].s.a', '')
      const fullCityName = _.get(res, 'results[0].s.n[0]', '')
      const updatedTime = _.get(res, 'results[0].s.t[0]', '')

      display({
        id,
        icon,
        title: `AQI of ${fullCityName}`,
        onSelect: () => actions.open(`${SITE_URL}city/${encodeURIComponent(fullCityName)}`),
        getPreview: () => (
          <Preview
            averageAqi={averageAqi}
            fullCityName={fullCityName}
            aqiList={res.results}
            updatedTime={updatedTime}
          />
        )
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
