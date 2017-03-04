const _ = require('lodash')
const React = require('react')

const Preview = require('./Preview')
const icon = require('./plugin-icon.png')

const id = 'aqi';
const BASE_URL = 'https://wind.waqi.info/nsearch/full/'


function fetchAiqData(city) {
  return fetch(`${BASE_URL}${encodeURIComponent(city)}`).then(res => res.json())
}

const fn = ({term, display, actions}) => {
  let match = term.match(/^aqi?\s(.+)$/);
  match = match || term.match(/^(.+)\saqi?$/);
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
