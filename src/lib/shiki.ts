import { createHighlighterCore } from 'shiki/core'
import darkPlus from 'shiki/themes/dark-plus'
import typescriptLang from 'shiki/langs/typescript'
import javascriptLang from 'shiki/langs/javascript'
import cssLang from 'shiki/langs/css'
import htmlLang from 'shiki/langs/html'

let highlighterPromise: ReturnType<typeof createHighlighterCore> | null = null

export function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [darkPlus],
      langs: [typescriptLang, javascriptLang, cssLang, htmlLang],
    })
  }
  return highlighterPromise
}
