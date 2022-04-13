/*
	simplydialogs
	(c) 2022 David Konrad 
	https://github.com/davidkonrad/simplydialogs
*/

"use strict";

const SimplyDialogs = (function(document) {

	let defaults = {
		headers: {
			alert: 'Alert', 
			error: 'Error',
			confirm: 'Confirm',
			information: 'Information',
			bell: 'Notice'
		},
		icons: {
			alert: '⚠', 
			error: '⛔',
			confirm: '✔️',
			information: '💡',
			bell: '🔔',
			wait: '⚙️'
		},
		buttons: {
			captions: {
				ok: 'Ok',
				cancel: 'Cancel',
				yes: 'Yes',
				no: 'No'
			},
			classes: {
				ok: '',
				cancel: '',
				yes: '',
				no: ''
			}
		}
	}

	const gebi = function(id) {
		return document.getElementById(id)
	}

	const getCnt = function(html) {
		const cnt = document.createElement("SPAN")
		cnt.innerHTML = html
		document.body.appendChild(cnt)
		return cnt
	}

	const initDialog = function(dialog, type, options) {
		let use = Object.assign({}, defaults) 
		const popBtn = function(name) {
			if (dialog.querySelector(`.dialog-${name}`) && use.buttons.classes[name]) dialog.querySelector(`.dialog-${name}`).classList.add(...use.buttons.classes[name].split(' '))
			if (dialog.querySelector(`.dialog-${name}`) && use.buttons.captions[name]) dialog.querySelector(`.dialog-${name}`).innerHTML = use.buttons.captions[name]
		}
		if (options) Object.keys(options).forEach(function(key) {
			if (options[key] instanceof Object) {
				use[key] = Object.assign({}, use[key], options[key])
			} else {
				use[key] = options[key]
			}
		})
		if (type !== 'wait') dialog.querySelector('.dialog-header').innerHTML = use.headers[type]
		dialog.querySelector('.dialog-icon').innerHTML = use.icons[type]
		;['ok', 'cancel', 'yes', 'no'].forEach((name) => popBtn(name))
	}

	const closeDialog = function(dialog, cnt) {
		dialog.classList.add('close')
		setTimeout(function() {
			dialog.close()
			document.body.removeChild(cnt)
		}, dialog.clientHeight - 70)
	}

	const genericHTML = `
		<dialog id="dialog-generic" style="min-width:250px;">
		  <h4 class="dialog-header"></h4>
			<span class="dialog-icon"></span>
		  <p class="dialog-message" style="margin-top:0.5em;"></p>
		  <div class="dialog-actions">
		    <button role="submit" class="dialog-ok" autofocus></button>
		  </div>
		</dialog>
	`;

//alert
	const alert = function(message, options) {
		return new Promise(function(resolve) {
			const cnt = getCnt(genericHTML)
			const dialog = gebi('dialog-generic')
			initDialog(dialog, 'alert', options)		
			dialog.querySelector('.dialog-message').innerHTML = message
			dialog.showModal()
			dialog.querySelector('.dialog-ok').onclick = function() {
				closeDialog(dialog, cnt)
				resolve(true)
			}
		})
	}

//information
	const information = function(message, options) {
		return new Promise(function(resolve) {
			const cnt = getCnt(genericHTML)
			const dialog = gebi('dialog-generic')
			initDialog(dialog, 'information', options)		
			dialog.querySelector('.dialog-message').innerHTML = message
			dialog.showModal()
			dialog.querySelector('.dialog-ok').onclick = function() {
				closeDialog(dialog, cnt)
				resolve(true)
			}
		})
	}

//error
	const error = function(message, options) {
		return new Promise(function(resolve) {
			const cnt = document.createElement("SPAN")
			cnt.innerHTML = genericHTML
			document.body.appendChild(cnt)
			const dialog = gebi('dialog-generic')
			initDialog(dialog, 'error', options)
			dialog.querySelector('.dialog-message').innerHTML = message
			dialog.showModal()
			dialog.querySelector('.dialog-ok').onclick = function() {
				closeDialog(dialog, cnt)
				resolve(true)
			}
		})
	}

//confirm
	const confirmHTML = `
		<dialog id="dialog-confirm" style="min-width:250px;">
		  <h4 class="dialog-header"></h4>
			<span class="dialog-icon"></span>
		  <p class="dialog-message"></p>
		  <div class="dialog-actions">
		    <button role="submit" class="dialog-yes" autofocus></button>
		    <button role="button" class="dialog-no"></button>
		  </div>
		</dialog>
	`;

	const confirm = function(message, options) {
		return new Promise(function(resolve) {
			const cnt = getCnt(confirmHTML)
			const dialog = gebi('dialog-confirm')
			initDialog(dialog, 'confirm', options)
			dialog.querySelector('.dialog-message').innerHTML = message
			dialog.showModal()
			const ret = function(val) {
				closeDialog(dialog, cnt)
				resolve(val)
			}
			dialog.querySelector('.dialog-yes').onclick = function() {
				ret(true)
			}
			dialog.querySelector('.dialog-no').onclick = function() {
				ret(false)
			}
		})
	}

//bell
	const bellHTML = `
		<dialog id="dialog-bell" style="min-width:250px;">
		  <h4 class="dialog-header"></h4>
			<span class="dialog-icon"></span>
		  <p class="dialog-message" style="margin-top:0.5em;"></p>
		  <div class="dialog-actions">
		    <button role="submit" class="dialog-ok" autofocus></button>
		  </div>
		</dialog>
	`;

	const bell = function(message, options) {
		return new Promise(function(resolve) {
			const cnt = getCnt(bellHTML)
			const dialog = gebi('dialog-bell')
			initDialog(dialog, 'bell', options)		
			dialog.querySelector('.dialog-message').innerHTML = message
			dialog.showModal()
			dialog.querySelector('.dialog-ok').onclick = function() {
				closeDialog(dialog, cnt)
				resolve(true)
			}
		})
	}

//wait
	const waitHTML = `
		<dialog id="dialog-wait" style="min-width:250px;">
			<span class="dialog-icon dialog-spinner"></span>
		  <p class="dialog-message" style="margin-top:0.5em;"></p>
		</dialog>
	`;

	const wait = function(message, options) {
		const cnt = getCnt(waitHTML)
		const dialog = gebi('dialog-wait')
		initDialog(dialog, 'wait', options)		
		dialog.querySelector('.dialog-message').innerHTML = message
		dialog.showModal()
		return { 
			close: function() {
				closeDialog(dialog, cnt)
			}
		}				
	}

//api
	return {
		DEFAULTS: defaults,
		alert,
		information, 
		info: information, //alias
		error,
		confirm,
		bell,
		wait
	}
	
})(document);

