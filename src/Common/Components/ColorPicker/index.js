import { useRef, useState } from 'react'
import styled from 'styled-components'
import { func, string } from 'prop-types'
import { SketchPicker } from 'react-color'

import useBlur from '../../Hooks/useBlur'

const ColorPicker = ({ className, color, onChange, ...props }) => {
  const [displayPicker, setDisplayPicker] = useState(false)
  const pickerRef = useRef(null)

  useBlur(
    (event) => {
      if (displayPicker && !pickerRef?.current?.contains?.(event.target)) {
        setDisplayPicker(false)
      }
    },
    [pickerRef],
  )

  return (
    <Container className={className} {...props}>
      <Swatch
        color={color}
        onClick={(e) => {
          e.preventDefault()
          setDisplayPicker(!displayPicker)
        }}
      />
      {displayPicker && !!onChange && (
        <PickerWrapper ref={pickerRef}>
          <SketchPicker color={color} onChange={({ hex }) => onChange(hex)} />
        </PickerWrapper>
      )}
    </Container>
  )
}

ColorPicker.propTypes = {
  className: string,
  color: string,
  onChange: func,
}

ColorPicker.defaultProps = {
  className: '',
  color: '#BF616A',
  onChange: undefined,
}

export default ColorPicker

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Swatch = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${props => props.color};
  outline: none;
  border: none;
`

const PickerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`
