import { useState } from 'react'
import styled from 'styled-components'
import TimezoneSelectComponent from 'react-timezone-select'
import { Link as LinkComponent } from 'react-router-dom'

import ColorPicker from '../../Common/Components/ColorPicker'
import ButtonCSS from '../../Common/css/button'
import {
  addTimezone,
  loadTimezones,
  removeTimezone,
  saveTimezones,
} from '../../Helpers/timezones'

const Settings = () => {
  const [timezone, setTimezone] = useState(null)
  const [color, setColor] = useState('#BF616A')
  const [timezones, setTimezones] = useState(loadTimezones())

  const handleClick = (e) => {
    e.preventDefault()
    if (!timezone) return
    const name = timezone.value
    const diff = +timezone.label.split(':')[0].replace('(GMT', '')
    setTimezones(addTimezone({ name, diff, color }))
  }

  return (
    <Wrapper>
      <Link to="/">Home</Link>
      <Row>
        <TimezoneSelect
          value={timezone?.value || ''}
          onChange={e => setTimezone(e)}
          labelStyle="abbrev"
        />
        <ColorPicker color={color} onChange={c => setColor(c)} />
      </Row>
      <Row>
        <Button onClick={handleClick}>Add timezone</Button>
        <Button onClick={() => setTimezones(saveTimezones([]))}>
          Delete all
        </Button>
      </Row>
      <Timezones>
        {timezones.map(timezone => (
          <Timezone key={timezone.name}>
            <Delete
              onClick={(e) => {
                e.preventDefault()
                setTimezones(removeTimezone(timezone.name))
              }}
            />
            <p>
              {`${timezone.name} (GMT ${timezone.diff >= 0 ? '+' : ''}${timezone.diff})`}
            </p>
            <ColorPicker color={timezone.color} />
          </Timezone>
        ))}
      </Timezones>
    </Wrapper>
  )
}

export default Settings

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100vw - 20vw);
  min-height: calc(100vh - 40vh);
  background-color: ${props => props.theme.nord0};
  padding: 30vh 10vw 10vh 10vw;
`

const Link = styled(LinkComponent)`
  ${ButtonCSS};
  margin-bottom: 20px;
`

const Button = styled.button`
  ${ButtonCSS};
  margin-top: 20px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > ${Button} {
    margin-left: 10px;
    margin-right: 10px;
  }
`

const TimezoneSelect = styled(TimezoneSelectComponent)`
  min-height: 40px;
  width: min(80vw, 400px);
  margin-right: 20px;
`

const Timezones = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;

  & > :not(:first-child) {
    margin-top: 20px;
  }
`

const Timezone = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & > p {
    color: ${props => props.theme.nord6};
    margin-right: 20px;
  }
`

const Delete = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  width: 20px;
  height: 20px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 20px;
    background-color: ${props => props.theme.nord6};
    transform: translateX(-50%) rotate(-45deg);
    transition: .3s ease-in-out;
  }

  &::after {
    transform: translateX(-50%) rotate(45deg);
  }

  &:hover::before {
    transform: translateX(-50%) rotate(45deg);
  }

  &:hover::after {
    transform: translateX(-50%) rotate(-45deg);
  }
`
