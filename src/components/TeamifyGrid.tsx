import GridLayout from 'react-grid-layout'
import React from 'react'
import { css } from '@emotion/core'
import { colors } from '../styles/variables'

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max))
}
const staticShuffle = (arr: ReactGridLayoutItem[], result: ReactGridLayoutItem[]): ReactGridLayoutItem[] => {
  if (arr.length === 0) return result
  const r = Array.from(result)
  const randomIndex = getRandomInt(arr.length)
  const emptyIndex = result.findIndex((element: ReactGridLayoutItem) => !element)
  const [randomItem] = arr.splice(randomIndex, 1)
  r[emptyIndex] = randomItem
  return staticShuffle(arr, r)
}

const cell = css`
  border: 1px solid ${colors.accent};
  padding: 4px 3px;
  border-radius: 5px;
  box-sizing: border;
  background-color: white;
`
const topContainer = css`
  display: flex;
`
const mainGridStyle = css`
  margin-bottom: 50px;
  background: rgb(129, 148, 251);
  background: linear-gradient(90deg, rgba(129, 148, 251, 1) 0%, rgba(173, 198, 232, 1) 50%, rgba(255, 155, 155, 1) 100%);
  width: 520px;
  min-height: 400px;
`
const subGridStyle = css`
  position: relative;
`

const nameStyle = css`
  width: 100%;
  font-size: 1.2rem;
  color: #333;
`
const fixButton = css`
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 90px;
  height: 36px;
  font-size: 1.2rem;
`
const deleteButton = css`
  width: 70px;
  height: 32px;
  font-size: 0.8rem !important;
  margin: 21px 0 !important;
`
const deleteButtonContainer = css`
  width: 90px;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
`
const leftContainer = css`
  width: 65%;
`

const rightContainer = css`
  width: 35%;
`
const nameInputContainer = css``

const buttons = css``

const description = css`
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif';
  margin-top: 24px;
`

const strongText = css`
  color: #bb1111d1;
  font-size: 1.4rem;
  letter-spacing: 0.1px;
  line-height: 1.8rem;
`

const benchText = css`
  text-align: center;
  font-size: 1.8rem;
  line-height: 1.8rem;
  padding-bottom: 1.5rem;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif';
`

const nameInput = css`
  width: 260px;
`

const otherButtons = css`
  margin: 0px 12px 24px !important;
`

const h3 = css`
  border: 2px solid #ff0000;
  text-align: center;
  border-radius: 5px;
  margin: 18px 126px;
  width: auto;
  color: #333;
`
//
interface ReactGridLayoutItem {
  i: string
  x: number
  y: number
  w: number
  h: number
  minW?: number
  maxW?: number
  static?: boolean
  static?: boolean
}
interface ReactGridLayoutState {
  mainGrid: Array<ReactGridLayoutItem>
  subGrid: Array<ReactGridLayoutItem>
  bottomGrid?: Array<ReactGridLayoutItem>
  loading?: boolean
}

interface Cord {
  x: number
  y: number
}
const APP_KEY = 'teamify-app'

class TeamifyGrid extends React.Component<{}, ReactGridLayoutState> {
  // コンストラクタで初期値をセット
  constructor(props: Prop) {
    super(props)
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.handleContextMenu = this.handleContextMenu.bind(this)
    this.shuffleArray = this.shuffleArray.bind(this)
    this.fixCell = this.fixCell.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.addCell = this.addCell.bind(this)
    this.cellToSub = this.cellToSub.bind(this)
    this.cellToMain = this.cellToMain.bind(this)
    this.deleteCell = this.deleteCell.bind(this)
    this.copyToCripBoard = this.copyToCripBoard.bind(this)

    const state: ReactGridLayoutState = this.fetchLS()
    if (!state.mainGrid) state.mainGrid = []
    if (!state.subGrid) state.subGrid = []

    const { mainGrid, subGrid } = state

    // stateの初期値を設定
    this.state = {
      mainGrid,
      subGrid,
      bottomGrid: [],
      loading: true
    }
  }

  onLayoutChange(layout) {
    console.log('ON LAYOUT CHANGE')
    console.table(layout)
    const { mainGrid, subGrid } = this.state

    const newGridLayout: ReactGridLayoutItem[] = layout.map((layoutItem: ReactGridLayoutItem) => {
      const gridItem: ReactGridLayoutItem = mainGrid.find((item: ReactGridLayoutItem) => item.i === layoutItem.i)
      gridItem.x = layoutItem.x
      gridItem.y = layoutItem.y
      gridItem.static = layoutItem.static
      return gridItem
    })
    console.table(newGridLayout)
    this.setState({ mainGrid: newGridLayout })

    this.saveToLocalStorage({ mainGrid, subGrid })
  }

  handleContextMenu = e => {
    e.preventDefault()
    console.log('handleContextMenu', e)
    localStorage.setItem(APP_KEY, JSON.stringify({ test: 'storage test' }))
  }

  saveToLocalStorage = (state: ReactGridLayoutState) => {
    console.log('saveToLocalStorage')
    localStorage.setItem(APP_KEY, JSON.stringify(state))
  }

  shuffle = () => {
    const { mainGrid } = this.state
    if (mainGrid.length !== 10) {
      alert('チーム分けは１０人で頼むわ')
      return
    }
    const shuffled = this.shuffleArray(mainGrid)
    this.setState({ mainGrid: shuffled })
  }

  isBrowser = () => typeof window !== 'undefined'

  fetchLS = () => {
    console.log(`fetchLS :`)
    const data = this.isBrowser() && window.localStorage.getItem(APP_KEY) ? JSON.parse(window.localStorage.getItem(APP_KEY)) : {}
    return data
  }

  getIndexFrom = (item: ReactGridLayoutItem) => item.x * 5 + item.y

  shuffleArray = (array: ReactGridLayoutItem[]) => {
    const arr = Array.from(array)
    const result: ReactGridLayoutItem[] = []
    result.length = 10
    for (let index = 0; index < arr.length; index += 1) {
      const item: ReactGridLayoutItem = arr[index]
      const isstatic = item.static
      if (isstatic) {
        const staticElement = arr[index]
        const gridIndex = this.getIndexFrom(staticElement)
        result[gridIndex] = staticElement
        arr[index] = undefined
      }
    }
    const shuffled = staticShuffle(arr.filter(_ => Boolean(_)), result)
    const mainGrid = shuffled.map((item: ReactGridLayoutItem, index: number) => {
      const gridData = { ...item }
      gridData.x = Math.floor(index / 5)
      gridData.y = index % 5
      return gridData
    })
    return mainGrid
  }

  fixCell = (cord: Cord) => {
    const { mainGrid, subGrid } = this.state
    console.log(`cord.x :`, cord.x)
    console.log(`cord.y :`, cord.y)
    const cell = mainGrid.find((item: ReactGridLayoutItem) => {
      console.log(`item : `, item)
      return item.x === cord.x && item.y === cord.y
    })
    cell.static = !cell.static
    const index = mainGrid.indexOf(cell)
    const newGrid = [...mainGrid]
    console.log(`newGrid :`, newGrid)
    newGrid[index] = cell
    this.setState({ mainGrid: newGrid })
    console.log('FORCE UPD')
    this.forceUpdate()
    this.saveToLocalStorage({ mainGrid, subGrid })
  }

  addCell = (e: Event) => {
    if (e.which !== 13) return
    const name: string = e.target.value as string
    if (!name) return
    const { mainGrid } = this.state
    if (mainGrid.some((item: ReactGridLayoutItem) => name === item.i)) {
      alert('同じ名前の人は登録できないよ')
      return
    }
    const leftTeamCount = mainGrid.filter(item => item.x === 0).length
    const rightTeamCount = mainGrid.filter(item => item.x === 1).length
    const isLeftTeam = leftTeamCount <= rightTeamCount
    const x = isLeftTeam ? 0 : 1
    const y = isLeftTeam ? leftTeamCount : rightTeamCount
    // if (mainGrid.length >= 10) {alert('10人までで頼むわ')}
    const item: ReactGridLayoutItem = {
      x,
      y,
      w: 1,
      h: 1,
      i: name,
      static: false
    }
    mainGrid.push(item)
    this.setState({ mainGrid })
    e.target.value = ''
    this.forceUpdate()
    // if (mainGrid.length === 10) this.shuffle()
  }

  cellToSub = (index: number, e: Event) => {
    console.log('cell to sub')
    e.preventDefault()
    const { mainGrid, subGrid } = this.state
    if (mainGrid[index].static) {
      alert('固定されてるやん')
      return
    }
    const [removedCell] = mainGrid.splice(index, 1)
    this.setState({ mainGrid })
    console.log(`removedCell :`, removedCell)
    console.log(`subGrid :`, subGrid)
    subGrid.push(removedCell)
    this.setState({ subGrid })
    console.log(`subGrid2 :`, subGrid)
    // if (mainGrid.length === 10) this.shuffle()
    this.forceUpdate()
  }

  cellToMain = (index: number, e: Event) => {
    e.preventDefault()
    console.log('CELL TO MAIN', index)
    const { mainGrid, subGrid } = this.state
    const [movingCell] = subGrid.splice(index, 1)
    this.setState({ subGrid })
    mainGrid.push(movingCell)
    this.setState({ mainGrid })
    // if (mainGrid.length === 10) this.shuffle()
    this.forceUpdate()
  }

  deleteCell = (index: number, e: Event) => {
    console.log('DELETE CELL', index)
    const { subGrid } = this.state
    subGrid.splice(index, 1)
    this.setState({ subGrid })
  }

  copyToCripBoard = () => {
    const { mainGrid } = this.state
    const text = mainGrid.reduce((accumulator, currentValue, currentIndex, array) => {
      if (currentIndex === 5) return `${accumulator}\n\`\`\`= Team 2 =\`\`\`\n${currentValue.i}\n`
      return `${accumulator + currentValue.i}\n`
    }, '.\n```= Team 1 =```\n')
    const textField = document.createElement('textarea')
    const br = document.createElement('br')
    textField.value = text
    const parentElement = document.getElementById('hidden')
    parentElement.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    parentElement.removeChild(textField)
  }

  render() {
    const { subGrid, loading } = this.state
    const mainGrid = JSON.parse(JSON.stringify(this.state.mainGrid))
    return (
      <div>
        <div css={topContainer}>
          <div css={leftContainer}>
            <div css={mainGridStyle}>
              <GridLayout
                className="layout"
                layout={mainGrid}
                cols={2}
                rowHeight={72}
                width={520}
                margin={[20, 5]}
                onLayoutChange={this.onLayoutChange}
                isBounded
              >
                {mainGrid.map((data, index) => {
                  const isStatic = data.static
                  const cord: Cord = { x: data.x, y: data.y }
                  return (
                    <div className={`elevation-4 ${loading || ''}`} css={cell} key={data.i} onContextMenu={e => this.cellToSub(index, e)}>
                      <div css={nameStyle}>{data.i}</div>
                      <button
                        type="button"
                        className={`ui button ${isStatic ? 'red' : ''}`}
                        css={fixButton}
                        onClick={e => (data.y < 5 ? this.fixCell(cord, e) : alert('はみ出さないように固定して（上から５番目まで）'))}
                      >
                        固定
                      </button>
                    </div>
                  )
                })}
              </GridLayout>
            </div>

            <div css={buttons}>
              <div>
                <button
                  type="button"
                  className="ui button teal
                "
                  onClick={this.shuffle}
                  css={otherButtons}
                >
                  シャッフル
                </button>
                <button
                  type="button"
                  className="ui button teal
                "
                  onClick={this.copyToCripBoard}
                  css={otherButtons}
                >
                  コピー（押してから `Ctrl + V` ）
                </button>
              </div>
              <div css={nameInputContainer}>
                <div className="ui labeled input">
                  <div className="ui label">名前打ってEnter</div>
                  <input type="text" placeholder={`今 ${mainGrid.length} 人`} onKeyPress={e => this.addCell(e)} css={nameInput} />
                </div>
              </div>
            </div>
            <div css={description}>
              <h3 css={h3}>大事だから読んで</h3>
              <ul>
                <li>
                  固定ボタン押すと、その人が固定されます。
                  <br />
                  （「AとBは同じチーム」とか「CとDは別のチーム」とか出来るよ）
                </li>
                <li>右クリックされた人はベンチに移ります</li>
                <li>ベンチの人を右クリックすると左に戻ります</li>
                <li>消すときはベンチに移してから</li>
                <li>コピーボタン押して貼り付けるといい感じになるからDiscordとかにそのまま貼ってみて</li>
                <li>
                  <strong css={strongText}>このサイト、閉じても次開いたとき同じ状態のまま残ってるよ！</strong>
                </li>
                <li>
                  IT系仕事受託募集してます。仕事くれる人DMください(twitter: <a href="https://twitter.com/Souler92y">@Souler92y</a>)
                </li>
              </ul>
            </div>
          </div>
          <div css={rightContainer}>
            {/* SUB GRID */}
            <div css={benchText}>ベンチ</div>
            <div css={subGridStyle}>
              <GridLayout className="layout" layout={subGrid} cols={1} rowHeight={72} width={200} margin={[2, 2]} isBounded>
                {subGrid.map((data, index) => {
                  return (
                    <div className="elevation-4" css={cell} key={data.i} onContextMenu={e => this.cellToMain(index, e)}>
                      <div css={nameStyle}>{data.i}</div>
                    </div>
                  )
                })}
              </GridLayout>
              <div css={deleteButtonContainer}>
                {subGrid.map((data, index) => {
                  return (
                    <div>
                      <button type="button" className="ui violet basic button" css={deleteButton} onClick={e => this.deleteCell(index, e)}>
                        削除
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div id="hidden" />
      </div>
    )
  }
}

export default TeamifyGrid
