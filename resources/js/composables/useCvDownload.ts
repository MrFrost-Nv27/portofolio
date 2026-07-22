/** Ported from the legacy "CV download with timestamp" behavior. */
export function useCvDownload() {
  function downloadCv(url: string, name = 'Nova Adi Saputra') {
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    const ts =
      `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}` +
      `_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
    const a = document.createElement('a')
    a.href = url
    a.download = `CV_${name}_${ts}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return { downloadCv }
}
