import { useEffect, useMemo, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { getMinutes, getHours, addHours, addMinutes } from 'date-fns'
import { arrayOf, number, shape, string } from 'prop-types'
import useBlur from '../../Hooks/useBlur'

const mmap = (value, min1, max1, min2, max2) => {
  return (value - min1) / (max1 - min1) * (max2 - min2) + min2
}

const getUTCDate = (date) => {
  const offset = date.getTimezoneOffset()
  return addMinutes(date, offset)
}

const Clock = ({ timezones }) => {
  const hours = useMemo(() => Array.from(
    { length: 24 },
    (current, idx) => (idx + 12) % 24
  ), [])
  const minutes = useMemo(() => Array.from(
    { length: 12 },
    (current, idx) => idx * 5
  ), [])
  const [now, setNow] = useState(getUTCDate(new Date()))
  const [offset, setOffset] = useState(0)
  const [timezone, setTimezone] = useState(null)
  const timezoneDetailsRef = useRef(null)

  useBlur((event) => {
    if (timezone && !timezoneDetailsRef?.current?.contains?.(event.target)) {
      setTimezone(null)
    }
  }, [timezoneDetailsRef])

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(getUTCDate(new Date()))
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Wrapper>
      <OuterRing>
        {minutes.map(minute => (
          <Indicator
            key={`minute-${minute}-indicator`}
            step={minute}
            steps={60}
          />
        ))}
        <InnerRing>
          {hours.map(hour => (
          <Indicator
            key={`hour-${hour}-indicator`}
            step={hour}
            steps={24}
            hour
          >
            <p>{hour}</p>
          </Indicator>
        ))}
        </InnerRing>
        <MinutesHand value={getMinutes(now)} />
        {timezones.map(timezone => {
          const date = addHours(now, timezone.diff)
          const hours = getHours(date)
          const minutes = getMinutes(date)
          return (
            <HoursHand
              key={timezone.name}
              color={timezone.color}
              value={hours + mmap(minutes, 0, 60, 0, 1)}
              offset={offset}
              onClick={() => setTimezone({ ...timezone, hours, minutes })}
            />
          )
        })}
      </OuterRing>
      <Slider
        type="range"
        min={0}
        max={360}
        value={offset}
        onChange={({ target }) => setOffset(target.valueAsNumber)}
      />
      {!!timezone && (
        <TimezoneDetails ref={timezoneDetailsRef}>
          <p>{timezone.name}</p>
          <p>{`GMT ${timezone.diff >= 0 ? '+' : ''}${timezone.diff}`}</p>
          <p>
            {`${timezone.hours}:${timezone.minutes.toString().padStart(2, '0')}`}
          </p>
        </TimezoneDetails>
      )}
    </Wrapper>
  )
}

Clock.propTypes = {
  timezones: arrayOf(
    shape({
      name: string.isRequired,
      diff: number.isRequired,
      color: string.isRequired,
    })
  ).isRequired,
}

Clock.defaultProps = {
  timezones: [{
    name: 'GMT',
    diff: 0,
    color: '#BF616A',
  }]
}

export default Clock

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const OuterRing = styled.div`
  width: min(80vw, 400px);
  height: min(80vw, 400px);
  border-radius: 50%;
  background-color: ${props => props.theme.nord1};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Indicator = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 45%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 50%;
  transform: translateY(-50%) rotate(calc(360deg / ${props => props.steps} * ${props => props.step} + ${props => props.hour ? '90deg' : '-90deg'}));

  &::after {
    content: '';
    width: 10%;
    height: 5px;
    border-radius: 10px;
    background-color: ${props => props.theme[props.hour ? 'nord10' : 'nord4']};
  }

  & > p {
    margin: 0 10px;
    transform: rotate(calc(-90deg - 360deg / ${props => props.steps} * ${props => props.step}));
  }
`

const InnerRing = styled.div`
  width: min(60vw, 300px);
  height: min(60vw, 300px);
  border-radius: 50%;
  background-color: ${props => props.theme.nord3};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::after {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.theme.nord6};
    z-index: 1;
  }
`

const Hand = css`
  height: 10px;
  border-radius: 10px;
  border: 2px solid ${props => props.theme.nord6};
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 50%;
`

const MinutesHand = styled.div`
  ${Hand};
  width: 35%;
  background-color: ${props => props.theme.nord12};
  transform: translateY(-50%) rotate(calc(360deg / 60 * ${props => props.value} - 90deg));
`

const HoursHand = styled.div.attrs(
  ({ value, offset = 0 }) => ({
    style: {
      transform: `translateY(-50%) rotate(calc(360deg / 24 * ${value} + 90deg + ${offset}deg))`,
      '&:hover > div': {
        transform: `rotate(calc(-90dev - 360deg / 24 * ${value} + ${offset}deg))`,
      },
    }
  })
)`
  ${Hand};
  width: 20%;
  background-color: ${props => props.color || '#BF616A'};
`

const Slider = styled.input`
  width: 100%;
  margin-top: 20px;
`

const TimezoneDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: ${props => props.theme.nord2};
  color: ${props => props.theme.nord6};
  border-radius: 5px;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
`
