import { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { ItemBubbleContent } from './ItemBubbleContent'
import { ModalStyle } from './Common/Modal.Style';
import './ItemBubble.scss';

Modal.setAppElement('body');

const checkFile = () => {
  try {
    return require("./ListingModal")
  } catch (err) {
    return null;
  }
};
const ListingModal = checkFile() ? checkFile().default : null;

const ItemBubble = ({ item, duplicatedItems }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isInfoClick, setIsInfoClick] = useState(false);
  const modalRef = useRef(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState([])

  const numFormatter = num => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + "K" // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(2) + "M" // convert to M for number from > 1 million
    } else if (num < 900) {
      return num // if value < 1000, nothing to do
    }
  }

  const openInfo = () => {
    if (!isInfoClick) {
      setIsInfoOpen(true)
    }
  }
  const closeInfo = () => {
    if (!isInfoClick) {
      setTimeout(() => {
        setIsInfoOpen(false)
      }, 100);
    }
  }
  const pointInfo = () => {
    setIsInfoClick(true)
    setIsInfoOpen(true)
  }
  const openModal = (clickedItem) => {
    setSelectedItem(clickedItem)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
      window.addEventListener('click', handleOutClick);
      return () => window.removeEventListener('click', handleOutClick);
  },[])

  const handleOutClick = (e) => {
    if(modalRef?.current?.contains(e.target)) return
    setIsInfoClick(false);
    setIsInfoOpen(false);
}

  return (
    <>
      <div
        ref={modalRef}
        onClick={pointInfo}
        onMouseOut={closeInfo}
        onMouseOver={openInfo}
        className= {item.isSecondaryResult ? "marker_grey" : "marker_green"}
      >
        {duplicatedItems.length > 1
          ? duplicatedItems.length + " Listings"
          : numFormatter(item.displayPrice)}

        <div
          className="popOutDiv"
          style={{ display: isInfoClick || isInfoOpen ? "block" : "none" }}
        >
          <ItemBubbleContent openModal={openModal} duplicatedItems={duplicatedItems} isInfoOpen={isInfoOpen}/>
        </div>
      </div>

      { ListingModal &&
        <Modal
          isOpen={modalIsOpen}
          style={{
            overlay: ModalStyle.overlay,
            content: {
              ...ModalStyle.content,
              width: '1300px'
            }
          }}
        >
          <ListingModal
            itemId={selectedItem.id}
            closeModal={closeModal}
          />
        </Modal>
      }
    </>
  )
}

export { ItemBubble }
