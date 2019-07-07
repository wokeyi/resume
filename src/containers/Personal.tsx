import * as React from 'react'
import { useTextAnimation } from 'src/hooks'

export interface IPersonalProps {
  infoText: string
  onFinished: () => void
}

const Personal: React.FunctionComponent<IPersonalProps> = ({
  infoText, onFinished
}) => {
  if (!infoText) {
    return null
  }
  const text = useTextAnimation({
    text: infoText, onFinished
  })
  return (
    <div dangerouslySetInnerHTML={{ __html: text }}/>
  )
}

export default Personal

