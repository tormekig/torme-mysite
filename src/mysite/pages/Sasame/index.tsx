import React from 'react'

import mysite from '../../assets/css/mysite.module.scss'
import 'mysite/assets/css/imgModal.scss'

import { ScrollTop } from '../../../utils/tools'
import { Content } from './Content'
import { Personality } from './Personality'
import { HowToTakePictures } from './HowToTakePictures'
import { MemoryList } from '../../components/Memory'
import { Footer } from 'mysite/components/Footer'

import Modal from 'react-modal'
import { useState } from 'react'
import { ImgMetaData, ImgModal } from 'mysite/components/imgModal'
import { Helmet } from 'react-helmet-async'

Modal.setAppElement('#root')

export function Sasame() {
  const [modalImgMetaData, setModalImgMetaData] = useState({ src: '' })
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const openModal = (imgMetaData: ImgMetaData) => {
    setModalIsOpen(true)
    setModalImgMetaData(imgMetaData)
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }
  return (
    <>
      <Helmet>
        <title>Sasame | Torme's Homepage</title>
      </Helmet>
      <div className={mysite.mysiteBody}>
        <ScrollTop />
        {/* <div id="splash">
        <div id="splash-logo">Sasame</div>
      </div>
      <div className="splashbg"></div> */}
        <div id="container">
          {/* @ts-expect-error Server Component */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            closeTimeoutMS={200}
          >
            <ImgModal imgMetaData={modalImgMetaData} />
          </Modal>
          <Content />
          <Personality />
          <HowToTakePictures openModal={openModal} />
          <MemoryList openModal={openModal} characters={['sasame']} />
          <Footer />
        </div>
      </div>
    </>
  )
}
