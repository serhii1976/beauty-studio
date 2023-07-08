import Notiflix from 'notiflix';
import axios from 'axios';
import validator from 'validator';

(() => {
  const refs = {
    openModalButton: document.querySelectorAll('.button'),
    closeModalButton: document.querySelector('.modal__close'),
    bacdropModal: document.querySelector('.bacdropModal'),
    title: document.querySelector('.modal__title'),
    text: document.querySelector('.modal__text'),
    form: document.querySelector('.modal__form'),
    inputs: document.querySelectorAll('.modal__input'),
    check: document.querySelector('.modal__check'),
    button: document.querySelector('.modal__button'),
    modalBody: document.querySelector('body'),
  };

  refs.openModalButton.forEach(button => {
    button.addEventListener('click', toggleMenu);
  });
  refs.closeModalButton.addEventListener('click', toggleMenu);
  refs.form.addEventListener('submit', handleSubmit);

  function toggleMenu() {
    refs.bacdropModal.classList.toggle('is-hidden');
    refs.modalBody.classList.toggle('overflowHidden');
    refs.check.classList.toggle('is-hidden');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const {
      elements: { client, number },
    } = event.currentTarget;
    const TOKEN = '6331735212:AAFKGYc84mRQJgoFosByRrxoXUt7yxqxlyE';

    const CHAT_ID = '-1001857246543';
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    if (!refs.check.classList.contains('is-hidden')) {
      toggleMenu();
      refs.title.textContent = 'ЗАПИШІТЬСЯ';
      refs.text.textContent = 'Забронюйте свій час та отримайте знижку 30%';
      refs.button.textContent = 'ЗАПИСАТИСЬ';
      refs.check.classList.toggle('is-hidden');
      refs.inputs.forEach(input => {
        input.classList.toggle('is-hidden');
      });
      return;
    }

    if (client.value === '' || number.value === '') {
      return Notiflix.Notify.warning('Будьласка, заповніть всі поля');
    }

    if (!validator.isAlpha(client.value)) {
      return Notiflix.Notify.warning("Введіть вірне ім'я, тільки літери");
    }

    if (!validator.isMobilePhone(number.value)) {
      return Notiflix.Notify.warning('Введіть вірний номер телефона');
    }

    let message = `<b>Заявка з сайта</b>\n`;
    message += `<b>Ім'я:</b> ${client.value}\n`;
    message += `<b>Телефон:</b> ${number.value}`;

    axios.post(URI_API, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: message,
    });

    console.log(`client: ${client.value}, number: ${number.value}`);
    event.currentTarget.reset();

    refs.title.textContent = 'ЗАЯВКА ПРИЙНЯТА';
    refs.text.textContent = 'Ми Вам зателефонуємо для підтвердження запису';
    refs.button.textContent = 'ДОБРЕ';
    refs.check.classList.toggle('is-hidden');
    refs.inputs.forEach(input => {
      input.classList.toggle('is-hidden');
    });
  }
})();
