import * as React from 'react'
import { ApiService } from 'src/services'
import { Personal, AnimationStyles } from 'src/containers'
import { Loading } from 'src/components'

interface IAppState {
  infoText: string
  styles: '',
  isFinished: boolean
}

const staticDirectory = process.env.REACT_APP_STATIC_PATH
  .replace('/', '')

class App extends React.Component<any, IAppState> {

  constructor(props: any) {
    super(props)
    this.state = {
      infoText: '',
      styles: '',
      isFinished: false,
    }
  }

  public componentDidMount(): void {
    this.fetchStyles()
    this.fetchInfo()
  }

  public render() {
    const { infoText, styles, isFinished } = this.state
    const loading = !(infoText && styles)
    return (
      <Loading
        loadingText='稍等，正在加载信息文件...'
        loading={loading}>
        <div className='main-pane'>
          <div className="text-pane">
            <Personal
              infoText={infoText}
              onFinished={this.handleFinished}
            />
          </div>
          <div className="style-pane">
            <AnimationStyles
              lastFinished={isFinished}
              styles={styles}
            />
          </div>
        </div>
      </Loading>
    )
  }

  private handleFinished = () => {
    this.setState({ isFinished: true })
  }

  private fetchInfo = async () => {
    try {
      const service = new ApiService(staticDirectory)
      const infoText = await service.get({ path: 'template.html' })
      this.setState({ infoText })
    } catch (error) {
      console.error(error)
    }
  }

  private fetchStyles = async () => {
    try {
      const service = new ApiService(staticDirectory)
      const styles = await service.get({ path: 'styles.css' })
      this.setState({ styles })
    } catch (error) {
      console.error(error)
    }
  }

}

export default App
