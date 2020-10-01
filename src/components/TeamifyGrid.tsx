import GridLayout from 'react-grid-layout'
import React from 'react'
import { css } from '@emotion/core'
import { colors } from '../styles/variables'

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max))
}
const fixedShuffle = (arr: ReactGridLayoutItem[], result: ReactGridLayoutItem[]): ReactGridLayoutItem[] => {
  if (arr.length === 0) return result
  const r = Array.from(result)
  const randomIndex = getRandomInt(arr.length)
  const emptyIndex = result.findIndex((element: ReactGridLayoutItem) => !element)
  const [randomItem] = arr.splice(randomIndex, 1)
  r[emptyIndex] = randomItem
  return fixedShuffle(arr, r)
}

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
  fixed?: boolean
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
    this.shuffleArray = this.shuffleArray.bind(this)
    // この例では関数内でthisを使用するため、thisをbind
    // this.bindFunc = this.func.bind(this);
    const mainGrid: ReactGridLayoutItem[] = [
      { x: 0, y: 0, w: 1, h: 1, i: 'souler', fixed: true },
      { x: 0, y: 1, w: 1, h: 1, i: 'inagibukit' },
      { x: 0, y: 2, w: 1, h: 1, i: 'ujimatcha' },
      { x: 0, y: 3, w: 1, h: 1, i: 'me, me', fixed: true },
      { x: 0, y: 4, w: 1, h: 1, i: 'unconcencios bias' },
      { x: 1, y: 0, w: 1, h: 1, i: 'nasinana' },
      { x: 1, y: 1, w: 1, h: 1, i: 'adasd asndas' },
      { x: 1, y: 2, w: 1, h: 1, i: 'dasdmasndaspd@', fixed: true },
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

  onLayoutChange(layout) {
    console.log({ layout })
    this.setState({ loading: false })
  }

  handleContextMenu = e => {
    e.preventDefault()
    console.log('prevent default')
    console.log({ e })
    localStorage.setItem(APP_KEY, JSON.stringify({ test: 'storage test' }))
    const { mainGrid } = this.state
    console.log({ mainGrid })
    const shuffled = this.shuffleArray(mainGrid)
    console.log({ shuffled })
    this.setState({ mainGrid: shuffled })
  }

  isBrowser = () => typeof window !== 'undefined'

  fetchLS = () => {
    const data = this.isBrowser() && window.localStorage.getItem(APP_KEY) ? JSON.parse(window.localStorage.getItem(APP_KEY)) : {}
    console.log({ data })
  }

  getIndexFrom = (item: ReactGridLayoutItem) => {
    return item.x * 5 + item.y
  }

  shuffleArray = (array: ReactGridLayoutItem[]) => {
    const arr = Array.from(array)
    console.log('shuffle original', array)
    console.log('copied arr', arr)
    const result: ReactGridLayoutItem[] = []
    result.length = 10
    arr.forEach((item: ReactGridLayoutItem, index: number) => {
      const isFixed = item.fixed
      if (!isFixed) return
      const [fixedElement] = arr.splice(index, 1)
      const gridIndex = this.getIndexFrom(fixedElement)
      result[gridIndex] = fixedElement
    })
    console.log(arr, result)
    const shuffled = fixedShuffle(arr, result)
    const mainGrid = shuffled.map((item: ReactGridLayoutItem, index: number) => {
      const gridData = { ...item }
      gridData.x = Math.floor(index / 5)
      gridData.y = index % 5
      return gridData
    })
    return mainGrid
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
