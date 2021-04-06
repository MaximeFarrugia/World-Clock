const TIMEZONES_KEY = '@clock/timezones'

const defaultTimezones = [{
  name: 'GMT',
  diff: 0,
  color: '#BF616A',
}]

export const saveTimezones = (timezones) => {
  if (!timezones) return

  localStorage.setItem(TIMEZONES_KEY, JSON.stringify(timezones))
  return timezones
}

export const addTimezone = (timezone) => {
  if (!timezone) return

  const timezones = loadTimezones()
  if (timezones.find(t => t.name === timezone.name)) return timezones
  const updatedTimezones = [...timezones, timezone]
  saveTimezones(updatedTimezones)
  return updatedTimezones
}

export const removeTimezone = (timezone) => {
  if (!timezone) return

  const timezones = loadTimezones()
  const updatedTimezones = timezones.filter(t => t.name !== timezone)
  saveTimezones(updatedTimezones)
  return updatedTimezones
}

export const editTimezone = (timezone) => {
  if (!timezone) return

  const timezones = loadTimezones()
  const updatedTimezones = timezones.reduce(
    (acc, current) => [
      ...acc,
      current.name === timezone.name ? timezone : current
    ],
  [])
  saveTimezones(updatedTimezones)
  return updatedTimezones
}

export const loadTimezones = () => {
  const storedTimezones = localStorage.getItem(TIMEZONES_KEY)

  if (!storedTimezones) {
    saveTimezones(defaultTimezones)
    return defaultTimezones
  }
  const parsed = JSON.parse(storedTimezones)
  if (!parsed || !parsed.length) {
    saveTimezones(defaultTimezones)
    return defaultTimezones
  }
  return parsed
}
