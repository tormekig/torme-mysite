import React from 'react'

import { useParams, useSearchParams } from 'react-router-dom'

import MAList from 'areacode/assets/css/MAList.module.scss'
import 'areacode/assets/css/accordion.scss'
import 'areacode/assets/css/searchModal.scss'
import { ScrollTop } from 'utils/tools'
import { AnimatePresence } from 'framer-motion'
import Modal from 'react-modal'
import { useState } from 'react'
import { MACompListContent, SearchType } from './MACompListContent'
import { MACompInfo } from 'areacode/data/MACompList'
import {
  Code3digit,
  Header,
  SearchModal,
  SearchPushNumber,
} from '../../components'
import { MAAreaCodeHeader } from './header'
import { MAAreaCodeInfoCards, MAAreaCodeInfoTable } from './components'
import { mediaQuery, useMediaQuery } from 'areacode/utils/responsive'

export function convertCompCode(MAComp: MACompInfo) {
  return MAComp.codeSub === ''
    ? MAComp.codeMain
    : MAComp.codeMain + '-' + MAComp.codeSub
}

const MAAreaCodeInfoComponents = ({
  type,
  query,
  style,
}: {
  type: SearchType
  query: string
  style: string
}) => {
  const [displayParam, setDisplayParam] = useState([
    '市外局番',
    '番号領域',
    '都道府県',
    'MA名',
    '市区町村',
  ])

  const { headerInfo, MAComps } = new MACompListContent().filter(type, query)
  const isExpanded = type === 'random' ? '' : 'item'
  let MAAreaCodeInfos: React.JSX.Element

  const isMobile = useMediaQuery(mediaQuery.mobile)

  if (style === 'card' || isMobile) {
    MAAreaCodeInfos = (
      <MAAreaCodeInfoCards MAComps={MAComps} displayParam={displayParam} />
    )
  } else {
    MAAreaCodeInfos = (
      <MAAreaCodeInfoTable MAComps={MAComps} displayParam={displayParam} />
    )
  }

  return (
    <div>
      <MAAreaCodeHeader
        info={headerInfo}
        displayParam={displayParam}
        setDisplayParam={setDisplayParam}
      />
      <AnimatePresence mode="wait">
        <div key="content">{MAAreaCodeInfos}</div>
      </AnimatePresence>
    </div>
  )
}

function displayCode3digit(type: SearchType, query: string) {
  if (type !== 'code' && type !== 'code_prefix') return <></>
  return Code3digit(Number(query.charAt(1)))
}

function SearchBox({ openFunc }: { openFunc: () => void }) {
  return (
    <div className={MAList.searchBox}>
      <SearchPushNumber />
      <div className={MAList.openSearchDetailContainer}>
        <div
          className={MAList.openSearchDetail}
          onClick={() => {
            openFunc()
          }}
        >
          <span>
            その他検索
            <br />
            <small>（3桁表・都道府県・市区町村）</small>
          </span>
        </div>
      </div>
    </div>
  )
}

export default function MAAreaCodeList({ type }: { type: SearchType }) {
  Modal.setAppElement('#root')

  const { query: _query } = useParams()
  const query: string = _query ? _query : ''

  const [searchParams] = useSearchParams()
  const _style = searchParams.get('style')
  const style = _style ? _style : ''

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const openModal = () => {
    setModalIsOpen(true)
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }
  const customStyles = {
    content: {
      margin: '0 auto',
      maxWidth: '1280px',
      inset: '4rem',
    },
    overlay: {
      transition: 'opacity 200ms ease-in-out',
    },
  }

  return (
    <div id="areacodeBody" className={MAList.areacodeBody}>
      <ScrollTop />
      <Header />
      <div>
        <div className={MAList.maAreaCodeContainer}>
          <SearchBox openFunc={openModal} />
          <Modal isOpen={modalIsOpen} style={customStyles} closeTimeoutMS={200}>
            <SearchModal closeFunc={closeModal} />
          </Modal>
          <MAAreaCodeInfoComponents type={type} query={query} style={style} />
          <div className={MAList.codeListMiddle}>
            {displayCode3digit(type, query)}
          </div>
        </div>
      </div>
    </div>
  )
}
