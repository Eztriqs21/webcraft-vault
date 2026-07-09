export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard.writeText(text).then(
    () => true,
    () => false
  )
}

let toastTimeout: ReturnType<typeof setTimeout> | null = null
let toastStyleEl: HTMLStyleElement | null = null

function ensureToastStyle() {
  if (toastStyleEl && document.head.contains(toastStyleEl)) return
  toastStyleEl = document.createElement('style')
  toastStyleEl.textContent = `@keyframes toast-progress { from { width: 100%; } to { width: 0%; } }`
  document.head.appendChild(toastStyleEl)
}

export function showToast(message: string) {
  const existing = document.getElementById('vault-toast')
  if (existing) existing.remove()

  if (toastTimeout) clearTimeout(toastTimeout)

  ensureToastStyle()

  const toast = document.createElement('div')
  toast.id = 'vault-toast'
  toast.setAttribute('role', 'status')
  toast.setAttribute('aria-live', 'polite')
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: rgba(10, 10, 10, 0.85);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 9999px;
    padding: 10px 24px;
    color: #f3f4f6;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 500;
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  `

  const check = document.createElement('span')
  check.textContent = '✓'
  check.style.cssText = 'color: #10b981; font-weight: 700;'

  const text = document.createElement('span')
  text.textContent = message

  const progress = document.createElement('div')
  progress.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #6366f1, #a855f7);
    border-radius: 0 0 9999px 9999px;
    width: 100%;
    animation: toast-progress 2s linear forwards;
  `

  toast.appendChild(check)
  toast.appendChild(text)
  toast.appendChild(progress)
  document.body.appendChild(toast)

  requestAnimationFrame(() => {
    toast.style.opacity = '1'
    toast.style.transform = 'translateX(-50%) translateY(0)'
  })

  toastTimeout = setTimeout(() => {
    toast.style.opacity = '0'
    toast.style.transform = 'translateX(-50%) translateY(20px)'
    setTimeout(() => {
      toast.remove()
    }, 300)
  }, 2000)
}
