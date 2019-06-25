import * as React from 'react'
import * as Prism from 'prismjs'
import { useTextAnimation } from 'src/hooks'
import './styles.scss'

export interface IAnimationStylesProps {
  lastFinished: boolean
  styles: string
}

const AnimationStyles: React.FunctionComponent<IAnimationStylesProps> = ({
  lastFinished, styles
}) => {
  if (!lastFinished) {
    return null
  }
  const ref = React.useRef<HTMLDivElement>(null)
  const calculatedStyles = useTextAnimation({ text: styles, interval: 40 })
  React.useEffect(() => {
    const container = ref.current as HTMLDivElement
    container.scrollTo(0, Number.MAX_SAFE_INTEGER)
  }, [calculatedStyles])
  return (
    <div className='animation-styles' ref={ref}>
      <style>
        {calculatedStyles}
      </style>
      <div
        className='content'
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(calculatedStyles, Prism.languages.css, 'css')
        }}
      />
    </div>
  )
}

export default AnimationStyles

