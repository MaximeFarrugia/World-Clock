import { useEffect } from 'react'

const useBlur = (callback, deps) => {
  useEffect(() => {
    const handleClick = (e) => {
      callback(e)
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...deps])
}

export default useBlur
