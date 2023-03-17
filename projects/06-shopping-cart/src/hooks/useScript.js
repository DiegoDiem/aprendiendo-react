import { useEffect, useState } from 'react'

const useScript = (src, isEnabled = true) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let script = document.querySelector(`script[src="${src}"]`)

    if (isEnabled && !script) {
      script = document.createElement('script')
      script.src = src
      script.async = true

      const onLoad = () => {
        setIsLoaded(true)
      }

      const onError = () => {
        setIsLoaded(false)
      }

      script.addEventListener('load', onLoad)
      script.addEventListener('error', onError)

      document.body.appendChild(script)

      return () => {
        script.removeEventListener('load', onLoad)
        script.removeEventListener('error', onError)
        document.body.removeChild(script)
      }
    } else if (!isEnabled && script) {
      document.body.removeChild(script)
    }

    return undefined
  }, [src, isEnabled])

  return isLoaded
}

export default useScript
