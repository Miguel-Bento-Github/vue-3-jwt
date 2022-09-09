// https://blog.guya.net/2015/06/12/sharing-sessionstorage-between-tabs-for-secure-multi-tab-authentication/
export function shareStorage() {
  if (typeof window !== 'undefined') {
    if (!sessionStorage.length) {
      // Ask other tabs for session storage
      localStorage.setItem('getSessionStorage', String(Date.now()))
    }

    window.addEventListener('storage', (event) => {
      if (event.key == 'getSessionStorage') {
        // Some tab asked for the sessionStorage -> send it
        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
        localStorage.removeItem('sessionStorage')
      } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
        // sessionStorage is empty -> fill it
        const data = JSON.parse(event.newValue)
        for (let key in data) {
          sessionStorage.setItem(key, data[key])
        }
      }
    })
  }
}
