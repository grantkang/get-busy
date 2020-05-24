
class NotificationService {
  constructor(modalOverlay) {
    this.modalOverlay = modalOverlay;
    this.modalContainer = modalOverlay.querySelector('#modal-container');
    this.modalHeader = modalOverlay.querySelector('#modal-header');
    this.modalBody = modalOverlay.querySelector('#modal-body');
    this.modalOptions = modalOverlay.querySelector('#modal-options');
    this.isOpen = false;
  }

  isOpen = () => {
    return this.isOpen();
  };

  open = (headerContent, bodyContent, modalOptionsContent) => {
    this.modalHeader.textContent = headerContent;
    bodyContent.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      p.classList.add('card-text');
      this.modalBody.appendChild(p);
    });
    modalOptionsContent.forEach(option => {
      const button = document.createElement('button');
      button.classList.add('btn', 'col-md-3', 'col-sm-12', 'mx-md-2', 'my-1');
      if (option.type) {
        button.classList.add('btn-' + option.type);
      } else {
        button.classList.add('btn-primary');
      }
      button.textContent = option.label;
      button.addEventListener('click', this.close);
      if (option.callback) button.addEventListener('click', option.callback);
      this.modalOptions.appendChild(button);
    });
    this.modalOverlay.classList.remove('d-none');
  };

  close = () => {
    this.modalHeader.innerHTML = '';
    this.modalBody.innerHTML = '';
    this.modalOptions.innerHTML = '';
    this.modalOverlay.classList.add('d-none');
  }

}

module.exports = NotificationService;
