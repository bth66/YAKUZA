// @prepros-append plugin.js
// @prepros-append scripts.js
var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0; // At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !!window.chrome && !isOpera; // Chrome 1+
var isIE = false || !!document.documentMode; // At least IE6

function firefoxWarn(options) {
    const DEFAULT__WIDTH = '350px'
    const browsWarn = document.createElement('div');
    browsWarn.classList.add('browser-warn');
    browsWarn.insertAdjacentHTML('afterbegin', `
	<div class="browser-warn__overlay">
		<div class="browser-warn__body" style="max-width:${options.width || DEFAULT__WIDTH}">
		${options.closeble ? `<span class="browser-warn__close">&times;</span>` : ''}
			<h4 class="browser-warn__title">${options.title || ''}</h4>
			${options.content || ''}			  
			<div class="browser-warn__btn">
					<button class="browser-warn__ok">OK</button>
			</div>
		</div>
	</div>
`);
   document.body.appendChild(browsWarn);
   document.body.classList.add('_lock');
}

const burger = document.querySelector('.menu-header__icon');
const menu = document.querySelector('.menu-header__menu');
const body = document.querySelector('body');

burger.addEventListener("click", (e) => {
   burger.classList.toggle('active');
   menu.classList.toggle('active');
   body.classList.toggle('_lock');
});


function createModal() {
   const lmodal = document.createElement('div');
   lmodal.classList.add('modal');
   lmodal.insertAdjacentHTML('afterbegin', `
	<div class="modal__overlay">
	<div class="modal__body">
		<h3 class="modal__title">Авторизация</h3>
		<form action="" method="get">
				<p class="modal__login">Введите email</p>
				<input type="email" name="login" id="login">
				<p class="modal__pass">Введите пароль</p>
				<input type="password" name="password" id="pass">
		</form>
		<div class="modal__btn">
					<button type="submit" class="modal__enter">Войти</button>
					<button class="modal__cancel">Отмена</button>
				</div>
	</div>
	</div>
`);
   document.body.appendChild(lmodal);
   return lmodal;
}


modal = function() {
   const $modal = createModal();
	const userModal = {
		open() {
			$modal.classList.add('active');
	},
		close() {
			$modal.classList.remove('active');
	}	
	};
return userModal
}
const myModal = modal()
const modalOpen = document.querySelector('.modal-open');
const modalClose = document.querySelector('.modal__cancel');


modalOpen.addEventListener("click", (e) => {
    if (burger.classList.contains('active') && menu.classList.contains('active')) {
        burger.classList.remove('active');
        menu.classList.remove('active');
        myModal.open();
    } else {
        myModal.open();
        body.classList.add('_lock');
    }
});
modalClose.addEventListener("click", (e) => {
    myModal.close();
    body.classList.remove('_lock');
});

if (isFirefox) {
    const home = document.querySelector('.home')
    home.style.background = 'none';
    const warnWindowFireFox = firefoxWarn({
        title: 'Вы используете <span>FireFox</span>!',
        closeble: true,
        content: `
        <p class="browser-warn__text">Для корректной работы сайта, используйте другой браузер</p>
        `,
        width: ''
    });
    const warnClose = document.querySelector('.browser-warn__close');
    const warnBtn = document.querySelector('.browser-warn__ok');
    const firefoxWarnWindow = document.querySelector('.browser-warn');
    warnClose.addEventListener('click', (e) => {
        firefoxWarnWindow.classList.add('close');
        body.classList.remove('_lock');
    });
    warnBtn.addEventListener('click', (e) => {
        firefoxWarnWindow.classList.add('close');
        body.classList.remove('_lock');
    });
}
