import React from 'react'
import { css } from '@emotion/core'
import { colors } from '../styles/variables'

const cell = css`
  border: 1px solid ${colors.accent};
  height: 100%;
`
const nameStyle = css`
  width: 100%;
  font-size: 1.8rem;
  color: #333;
`
const dropDown = css``

interface PlayerCellProps {
  name: string
  onContextMenu?: Function
}

interface PlayerCellState {
  test: string
}
const PlayerCell = (props: PlayerCellProps) => {
  const { name, onContextMenu } = props
  return (
    <div className="elevation-4" css={cell} key={name} onContextMenu={onContextMenu}>
      <div css={nameStyle}>{name}</div>
      <div css={dropDown}>
        <select className="ui compact selection dropdown">
          <option value="all">All</option>
          <option selected value="articles">
            Articles
          </option>
          <option value="products">Products</option>
        </select>
      </div>
    </div>
  )
}

export default PlayerCell
