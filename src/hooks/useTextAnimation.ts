import * as React from 'react'

export interface IUseTextAnimationOptions {
  text: string
  interval?: number
  onFinished?: () => void
}

let cid = 0
const defaultDelay = process.env.NODE_ENV === 'production' ? 20 : 0
const index: { [key: string]: number } = {}

export function useTextAnimation(opts: IUseTextAnimationOptions): string {
  const originalText = opts.text
  const [text, setText] = React.useState('')
  React.useEffect(() => {
    const key = String(cid++)
    index[key] = 0
    const length = originalText.length
    const timer = setInterval(() => {
      if (index[key] >= length) {
        clearInterval(timer)
        opts.onFinished && opts.onFinished()
      } else {
        setText(originalText.slice(0, index[key]++))
      }
    }, opts.interval || defaultDelay)
    return () => {
      delete index[key]
      clearInterval(timer)
    }
  }, [originalText])
  return text
}
