class Modal {
  static modal = document.getElementById('modal');

  static openModal() {
    Modal.modal.style.display = 'flex';
  }

  static closeModal() {
    Modal.modal.style.display = 'none';
  }

  static nBBtnClickOpenModal() {
    Modal.openModal();
  }

  static closeModalWindow(e) {
    if (e.target === Modal.modal || e.key === 'Escape') {
      Modal.closeModal();
    }
  }
}

module.exports = { Modal };
