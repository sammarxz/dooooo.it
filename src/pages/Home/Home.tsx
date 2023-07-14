import { CustomModal } from '@/components'

export function Home() {
  const handleModal1Open = () => {
    console.log('Modal 1 aberto')
  }

  const handleModal1Close = () => {
    console.log('Modal 1 fechado')
  }

  const handleModal2Open = () => {
    console.log('Modal 2 aberto')
  }

  const handleModal2Close = () => {
    console.log('Modal 2 fechado')
  }

  return (
    <div>
      <CustomModal
        showModalButtonText="Open Modal 1"
        modalId="modal1"
        onOpen={handleModal1Open}
        onClose={handleModal1Close}
      >
        <CustomModal.Header>Modal 1 Header</CustomModal.Header>
        <p>Modal 1 Content</p>
        <CustomModal.Footer>
          <button>Cancel</button>
          <button>Delete</button>
        </CustomModal.Footer>
      </CustomModal>

      <CustomModal
        showModalButtonText="Open Modal 2"
        modalId="modal2"
        onOpen={handleModal2Open}
        onClose={handleModal2Close}
      >
        <CustomModal.Header>Modal 2 Header</CustomModal.Header>
        <p>Modal 2 Content</p>
        <CustomModal.Footer>
          <button>Cancel</button>
          <button>Delete</button>
        </CustomModal.Footer>
      </CustomModal>
    </div>
  )
}
