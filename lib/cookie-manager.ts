export function setCookie(name: string, value: string, days: number = 7): void {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days)

  const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`
  document.cookie = cookieString
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split('; ')
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=')
    if (cookieName === name) {
      return cookieValue
    }
  }
  return null;
}

export function removeCookie(name: string): void {
  setCookie(name, '', -1)
}

export function updateCookie(name: string, updater: (currentValue: string | null) => string): void {
  const currentValue = getCookie(name)
  const updatedValue = updater(currentValue)
  setCookie(name, updatedValue)
}
