import { css } from 'styled-components'

const button = css`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${props => props.theme.nord6};
  font-size: 20px;
  font-weight: bold;
  position: relative;
  padding: 10px 15px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 70%;
    border-top: 2px solid ${props => props.theme.nord6};
    border-left: 2px solid ${props => props.theme.nord6};
    transition: .2s ease-in-out;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 70%;
    border-bottom: 2px solid ${props => props.theme.nord6};
    border-right: 2px solid ${props => props.theme.nord6};
    transition: .2s ease-in-out;
  }

  &:hover::before,
  &:hover::after {
    width: calc(100% - 2px);
    height: calc(100% - 2px);
  }
`

export default button
