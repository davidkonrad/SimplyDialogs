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
			bell: '🔔'
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
		dialog.querySelector('.dialog-header').innerHTML = use.headers[type]
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
			<audio autoplay="autoplay">
				<source	src="data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=">
			</audio>
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

	return {
		DEFAULTS: defaults,
		alert,
		information, 
		info: information, //alias
		error,
		confirm,
		bell
	}
	
})(document);

