import GridLayout from 'react-grid-layout'
import React from 'react'
import { css } from '@emotion/core'
import { colors } from '../styles/variables'

const cell = css`
  border: 1px solid ${colors.accent};
`
const container = css`
  display: flex;
`
const mainGridStyle = css`
  width: 65%;
`
const subGridStyle = css`
  width: 25%;
`
interface ReactGridLayoutItem {
  i: string
  x: number
  y: number
  w: number
  h: number
  minW?: number
  maxW?: number
  static?: boolean
}
interface ReactGridLayoutState {
  mainGrid: Array<ReactGridLayoutItem>
  subGrid: Array<ReactGridLayoutItem>
  bottomGrid: Array<ReactGridLayoutItem>
  loading: boolean
}
const APP_KEY = 'teamify-app'

class TeamifyGrid extends React.Component<{}, ReactGridLayoutState> {
  // コンストラクタで初期値をセット
  constructor(props: Prop) {
    super(props)
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.handleContextMenu = this.handleContextMenu.bind(this)
    // この例では関数内でthisを使用するため、thisをbind
    // this.bindFunc = this.func.bind(this);
    const mainGrid: ReactGridLayoutItem[] = [
      { x: 0, y: 0, w: 1, h: 1, i: 'souler' },
      { x: 0, y: 1, w: 1, h: 1, i: 'inagibukit' },
      { x: 0, y: 2, w: 1, h: 1, i: 'ujimatcha' },
      { x: 0, y: 3, w: 1, h: 1, i: 'me, me' },
      { x: 0, y: 4, w: 1, h: 1, i: 'unconcencios bias' },
      { x: 1, y: 0, w: 1, h: 1, i: 'nasinana' },
      { x: 1, y: 1, w: 1, h: 1, i: 'adasd asndas' },
      { x: 1, y: 2, w: 1, h: 1, i: 'dasdmasndaspd@' },
      { x: 1, y: 3, w: 1, h: 1, i: '9th' },
      { x: 1, y: 4, w: 1, h: 1, i: '10th' }
    ]

    const subGrid: ReactGridLayoutItem[] = [
      { x: 0, y: 0, w: 1, h: 1, i: 'sub 1' },
      { x: 0, y: 1, w: 1, h: 1, i: 'sub 2' },
      { x: 0, y: 2, w: 1, h: 1, i: 'sub 3' },
      { x: 0, y: 3, w: 1, h: 1, i: 'sub 4' }
    ]

    // stateの初期値を設定
    this.state = {
      mainGrid,
      subGrid,
      bottomGrid: [],
      loading: true
    }
  }

  componentDidMount() {
    document.addEventListener('contextmenu', this.handleContextMenu)
  }

  onLayoutChange(layout) {
    console.log({ layout })
    this.setState({ loading: false })
  }

  handleContextMenu = e => {
    e.preventDefault()
    console.log('prevent default')
    console.log({ e })
    localStorage.setItem(APP_KEY, JSON.stringify({ test: 'storage test' }))
  }

  // const [ls, setName] = React.useState('')
  //   React.useEffect(() => {
  //     setName(localStorage.getItem('test'))
  //   })
  //   const storageData = JSON.parse(ls)
  //   console.log({ storageData })
  isBrowser = () => typeof window !== 'undefined'

  fetchLS = () => {
    const data = this.isBrowser() && window.localStorage.getItem(APP_KEY) ? JSON.parse(window.localStorage.getItem(APP_KEY)) : {}
    console.log({ data })
  }

  render() {
    const { mainGrid, subGrid, bottomGrid, loading } = this.state

    return (
      <div css={container}>
        <div css={mainGridStyle}>
          <GridLayout
            className="layout"
            layout={mainGrid}
            cols={2}
            rowHeight={72}
            width={520}
            margin={[2, 2]}
            onLayoutChange={this.onLayoutChange}
            isBounded
          >
            {mainGrid.map((data, index) => {
              return (
                <div className={`elevation-4 ${loading || ''}`} css={cell} key={data.i} onContextMenu={this.handleContextMenu}>
                  {data.i}
                </div>
              )
            })}
          </GridLayout>
        </div>
        <div css={subGridStyle}>
          <GridLayout
            className="layout"
            layout={subGrid}
            cols={1}
            rowHeight={72}
            width={260}
            margin={[2, 2]}
            onLayoutChange={this.onLayoutChange}
            isBounded
          >
            {subGrid.map((data, index) => {
              return (
                <div className={`elevation-4 ${loading || ''}`} css={cell} key={data.i} onContextMenu={this.fetchLS}>
                  {data.i}
                </div>
              )
            })}
          </GridLayout>
        </div>
      </div>
    )
  }
}

export default TeamifyGrid
