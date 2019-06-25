import * as React from 'react'

export interface ILoadingProps {
  loadingText: string
  loading: boolean
  children: React.ReactNode
}

const Loading: React.FunctionComponent<ILoadingProps> = ({
  loading, loadingText, children
}) => {
  const style = loading ? undefined : { display: 'none' }
  return (
    <div className="loading">
      <div className="loading-layer" style={style}>
        {loadingText}
      </div>
      {children}
    </div>
  )
}

export default React.memo(Loading)

