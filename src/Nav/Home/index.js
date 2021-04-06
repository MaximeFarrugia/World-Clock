import { useState } from 'react'
import styled from 'styled-components'
import { Link as LinkComponent } from 'react-router-dom'

import Clock from '../../Common/Components/Clock'
import ButtonCSS from '../../Common/css/button'
import { loadTimezones } from '../../Helpers/timezones'

const Home = () => {
  const [timezones] = useState(loadTimezones())

  return (
    <Wrapper>
      <Clock timezones={timezones} />
      <Link to="/settings">Settings</Link>
    </Wrapper>
  )
}

export default Home

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.nord0};
  color: ${props => props.theme.nord6};
`

const Link = styled(LinkComponent)`
  margin-top: 50px;
  ${ButtonCSS};
`
