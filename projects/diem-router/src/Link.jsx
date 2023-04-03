import { EVENTS, BUTTONS } from './consts'

export function navigate (href) {
  window.history.pushState({}, '', href)
  // rear un evento personalizado
  const navigationEvent = new Event(EVENTS.PUSHSTAT)
  window.dispatchEvent(navigationEvent)
}

// para hacerlo declarativo, para que funcione con el teclado
export function Link ({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTONS.primary // primary click
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManeableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManeableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to) // navegacion con SPA
      // window.scrollTo(0, 0)
    }
  }

  return <a onClick={handleClick} href={to} target={target} {...props} />
}
