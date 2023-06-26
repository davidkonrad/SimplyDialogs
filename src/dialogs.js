/*
	SimplyDialogs
	(c) 2022- present David Konrad 
	https://github.com/davidkonrad/simplydialogs
	https://simplydialogs.github.io
*/

"use strict";

const SimplyDialogs = (function(document) {
	
	const defaults = {
		enterSubmit: true,
		backdrop: undefined,
		classes: '',
		headers: {
			alert: 'Alert', 
			error: 'Error',
			confirm: 'Confirm',
			information: 'Information',
			bell: 'Notice',
			input: ''
		},
		icons: {
			alert: '⚠', 
			error: '⛔',
			confirm: '✔️',
			information: '💡',
			bell: '🔔',
			wait: '⚙️',
			input: '✏️'
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
		},
		bell: 'data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="',
		input: {
			formLayout: 'left full-width',
			classes: {
				label: '',
				input: ''
			},
			inputs: [
				{ type: 'input', inputType: 'text', label: 'Input ', name: 'input', placeholder: 'Enter text ..' },
			],
			callback: function(state) {
				return state.input && state.input.length > 1
			}
		}
	}

	const gebi = (id) => { return document.getElementById(id) }

	const getCnt = function(html) {
		const cnt = document.createElement("SPAN")
		cnt.innerHTML = html
		document.body.appendChild(cnt)
		return cnt
	}

	const parseOptions = function(target, ...sources) {
		const isObject = (item) => { return (item && typeof item === 'object' && !Array.isArray(item)) }
		if (!sources.length) return target
		const source = sources.shift()
		if (isObject(target) && isObject(source)) {
			for (const key in source) {
				if (isObject(source[key])) {
					if (!target[key]) Object.assign(target, { [key]: {} })
					parseOptions(target[key], source[key])
				} else {
					Object.assign(target, { [key]: source[key] })
				}
			}
		}
		return parseOptions(target, ...sources)
	}

	const initDialog = function(dialog, type, options) {
		let use = JSON.parse(JSON.stringify(defaults))
		const popBtn = function(name) {
			if (!use.buttons.captions[name]) {
				dialog.querySelector(`.dialog-${name}`).style.display = 'none'
				return
			}
			if (dialog.querySelector(`.dialog-${name}`) && use.buttons.classes[name]) dialog.querySelector(`.dialog-${name}`).classList.add(...use.buttons.classes[name].split(' '))
			if (dialog.querySelector(`.dialog-${name}`) && use.buttons.captions[name]) dialog.querySelector(`.dialog-${name}`).innerHTML = use.buttons.captions[name]
		}
		if (options) parseOptions(use, options)
		if (type !== 'wait') dialog.querySelector('.dialog-header').innerHTML = use.headers[type]
		dialog.querySelector('.dialog-icon').innerHTML = use.icons[type] || ''
		;['ok', 'cancel', 'yes', 'no'].forEach((name) => popBtn(name))
		if (use.classes && typeof use.classes === 'string') {
			dialog.classList.add(...use.classes.split(' '))
		} else {
			dialog.classList.add('default')
		}
		if (use.backdrop) {
			dialog.backdrop = document.createElement('style')
			dialog.backdrop.id = 'simplydialogs_' + Math.random()
			dialog.backdrop.innerText = `dialog::backdrop { ${use.backdrop.replace(/\r?\n|\r/g, '')} }`
			document.head.appendChild(dialog.backdrop)
		}
		dialog.addEventListener('keypress', (e) => { 
			if (e.which === 13 && e.target.nodeName !== 'TEXTAREA') {
				if (use.enterSubmit === true) {
					const me = new MouseEvent('click', { 'view': window, 'bubbles': true, 'cancelable': false })
					if (dialog.querySelector('.dialog-ok')) dialog.querySelector('.dialog-ok').dispatchEvent(me)
					if (dialog.querySelector('.dialog-yes')) dialog.querySelector('.dialog-yes').dispatchEvent(me)
				}
				e.preventDefault()
			}
		})
		return use
	}

	const closeDialog = function(dialog, cnt) {
		dialog.classList.add('close')
		dialog.removeAttribute('open')
		setTimeout(function() {
			dialog.close()
			if (dialog.backdrop) if (gebi(dialog.backdrop.id)) gebi(dialog.backdrop.id).remove()
			if (document.body.contains(cnt)) document.body.removeChild(cnt)
		}, dialog.clientHeight - 70)
	}

	const genericHTML = `
		<dialog class="dialog-template" role="dialog" aria-labelledby="dialog-header dialog-message">
		  <h4 class="dialog-header"></h4>
			<span class="dialog-icon"></span>
		  <p class="dialog-message"></p>
		  <div class="dialog-actions">
		    <button role="submit" class="dialog-ok" autofocus></button>
		  </div>
		</dialog>
	`;

//generics
	const alertGeneric = function(message, options, type) {
		return new Promise(function(resolve) {
			const cnt = getCnt(genericHTML)
			const dialog = cnt.querySelector('.dialog-template')
			initDialog(dialog, type, options)		
			dialog.querySelector('.dialog-message').innerHTML = message
			dialog.showModal()
			const ret = function(val) {
				closeDialog(dialog, cnt)
				resolve(val)
			}
			dialog.querySelector('.dialog-ok').onclick = () => { ret(true) }
			dialog.addEventListener('close', () => { ret(true) })
			dialog.addEventListener('cancel', () => { ret(false) })
		})
	}

//alert
	const alert = function(message, options) {
		return alertGeneric(message, options, 'alert')
	}

//information
	const information = function(message, options) {
		return alertGeneric(message, options, 'information')
	}

//error
	const error = function(message, options) {
		return alertGeneric(message, options, 'error')
	}

//bell
	const bell = function(message, options) {
		return new Promise(function(resolve) {
			const cnt = getCnt(genericHTML)
			const dialog = cnt.querySelector('.dialog-template')
			options = initDialog(dialog, 'bell', options)
			dialog.querySelector('.dialog-message').innerHTML = message
			dialog.showModal()
			if (options.bell && typeof options.bell === 'string') {
				dialog.insertAdjacentHTML('afterbegin', `<audio autoplay="autoplay"><source	src="${options.bell}"></audio>`)
			}
			const ret = function(val) {
				closeDialog(dialog, cnt)
				resolve(val)
			}
			dialog.querySelector('.dialog-ok').onclick = () => { ret(true) }
			dialog.addEventListener('close', () => { ret(true) })
			dialog.addEventListener('cancel', () => { ret(false) })
		})
	}

//confirm
	const confirmHTML = `
		<dialog class="dialog-template" role="dialog" aria-labelledby="dialog-header dialog-message">
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
			const dialog = cnt.querySelector('.dialog-template')
			initDialog(dialog, 'confirm', options)
			dialog.querySelector('.dialog-message').innerHTML = message
			dialog.showModal()
			const ret = function(val) {
				closeDialog(dialog, cnt)
				resolve(val)
			}
			dialog.querySelector('.dialog-yes').onclick = () => { ret(true) }
			dialog.querySelector('.dialog-no').onclick = () => { ret(false) }
			dialog.addEventListener('close', () => { ret(true) })
			dialog.addEventListener('cancel', () => { ret(false) })
		})
	}

//wait
	const waitHTML = `
		<dialog class="dialog-template" role="dialog" aria-labelledby="dialog-message">
			<span class="dialog-icon dialog-spinner"></span>
		  <p class="dialog-message"></p>
		</dialog>
	`;

	const wait = function(message, options) {
		const cnt = getCnt(waitHTML)
		const dialog = cnt.querySelector('.dialog-template')
		initDialog(dialog, 'wait', options)		
		dialog.querySelector('.dialog-message').innerHTML = message
		dialog.addEventListener('cancel', (e) => { e.preventDefault() })
		dialog.showModal()
		return { 
			close: function() {
				closeDialog(dialog, cnt)
			}
		}				
	}

//input
	const inputHTML = `
		<dialog class="dialog-template" role="dialog" aria-labelledby="dialog-header dialog-message">
		  <h4 class="dialog-header"></h4>
			<span class="dialog-icon"></span>
		  <p class="dialog-message"></p>
			<form class="dialog-input"></form>
		  <div class="dialog-actions">
		    <button role="submit" class="dialog-ok" autofocus></button>
		    <button role="button" class="dialog-cancel"></button>
		  </div>
		</dialog>
	`;

	const input = function(message, options) {
		let count = 0
		let userCallback = undefined
		let labelClass = ''
		let inputClass = ''
		const cnt = getCnt(inputHTML)
		const dialog = cnt.querySelector('.dialog-template')

		const getFormState = function() {
			let fs = {}
			Array.from(dialog.querySelector('form').elements).forEach(i => {
				if (i.type && i.type === 'radio') {	
					const checked = dialog.querySelector('form').querySelector(`input[name="${i.name}"]:checked`)
					fs[i.name] = checked ? checked.value : null
				} else if (i.type && i.type === 'file') {
					fs[i.name] = i.files.length ? i.files[0] : null
				} else {
					fs[i.name] = i.value
				}
			})
			return fs
		}

		const cb = function() {
			if (userCallback(getFormState(), dialog) === true) {
				dialog.querySelector('.dialog-ok').removeAttribute('disabled')
			} else {
				dialog.querySelector('.dialog-ok').setAttribute('disabled', 'disabled')
			}
		}

		const br = function() { return document.createElement('BR') }
		const div = function() { return document.createElement('DIV') }

		const getLabel = function(label, forId) {
			const l = document.createElement('LABEL')
      l.htmlFor = forId
			l.innerHTML = label || ''
			l.className = labelClass
			return l
		}

		const createFormTag = function(type, name, label, opt) {
			count++
			const fd = div()
			const fi = document.createElement(type.toUpperCase())
			fi.id = type.toLowerCase() + '_' + count
			fi.name = name || fi.id
			fi.className = inputClass
			if (count === 1) fi.setAttribute('autofocus', 'autofocus')
			if (opt) for (const [key, value] of Object.entries(opt)) {
				fi.setAttribute(key, value)
			}
			fd.append(fi)
			const fl = div() 
			const l = getLabel(label, fi.id)
			fl.append(l)
			return {
				f: fd,
				l: fl
			}
		}

		const getCustomOptions = function(opt) {
			const ret = {}
			for (const [key, value] of Object.entries(opt)) {
				if (!['type', 'inputType', 'label', 'name', 'options'].includes(key)) ret[key] = value 
			}
			return ret	
		}

		const createInput = function(type, label, name, callback, opt) {
			const i = createFormTag('input', name, label, opt)
			i.f.querySelector('input').type = type
			if (type === 'checkbox') i.f.querySelector('input').classList.add('inline')
			if (callback) i.f.querySelector('input').addEventListener('input', cb)
			dialog.querySelector('.dialog-input').append(i.l, i.f)
		}

		const createTextarea = function(label, name, callback, opt) {
			const t = createFormTag('textarea', name, label, opt)
			if (callback) t.f.querySelector('textarea').addEventListener('input', cb)
			dialog.querySelector('.dialog-input').append(t.l, t.f)
		}

		const createSelect = function(label, name, options, callback, opt) {
			const s = createFormTag('select', name, label, opt)
			if (callback) s.f.querySelector('select').addEventListener('change', cb)
			options.forEach(o => { 
				s.f.querySelector('select').options.add( new Option(o.label, o.value) ) 
			})
			if (opt && opt.value) s.f.querySelector('select').value = opt.value
			dialog.querySelector('.dialog-input').append(s.l, s.f)
		}

		const createRadio = function(label, name, options, callback, opt) {
			const dr = div()
			options.forEach(o => {
				count++
				const r = document.createElement('INPUT')
				r.className = 'inline'
				r.id = 'radio_' + count
				r.type = 'radio'
				r.value = o.value
				r.name = name || r.id
				if (callback) r.addEventListener('change', cb)
				const li = getLabel(o.label, r.id)
				li.className = 'inline'
				dr.append(r, li, br())
			})
			const l = getLabel(label, '')
			const dl = div()
			dl.append(l)
			if (opt && opt.value) {
				const ci = dr.querySelector('input[value="' + opt.value + '"]')
				if (ci) ci.setAttribute('checked', 'checked')
			}
			dialog.querySelector('.dialog-input').append(dl, dr)
		}

		return new Promise(function(resolve) {
			options = initDialog(dialog, 'input', options)
			if (options.input.formLayout) dialog.querySelector('.dialog-input').classList.add(...options.input.formLayout.split(' '))
			dialog.querySelector('.dialog-message').innerHTML = message
			userCallback = options.input.callback
			if (userCallback) dialog.querySelector('.dialog-ok').setAttribute('disabled', 'disabled')
			labelClass = options.input.classes.label
			inputClass = options.input.classes.input
			options.input.inputs.forEach(i => {
				if (i.type === 'input') createInput(i.inputType, i.label, i.name, userCallback, getCustomOptions(i))
				if (i.type === 'textarea') createTextarea(i.label, i.name, userCallback, getCustomOptions(i))
				if (i.type === 'select') createSelect(i.label, i.name, i.options, userCallback, getCustomOptions(i))
				if (i.type === 'radio') createRadio(i.label, i.name, i.options, userCallback, getCustomOptions(i))
			})
			dialog.showModal()
			const ret = function(val) {
				closeDialog(dialog, cnt)
				resolve(val ? getFormState() : false)
			}
			dialog.querySelector('.dialog-ok').onclick = () => { ret(true) }
			dialog.querySelector('.dialog-cancel').onclick = () => { ret(false) }
			dialog.addEventListener('close', () => { ret(true) })
			dialog.addEventListener('cancel', () => { ret(false) })
		})
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
		wait,
		input,
		prompt: input //alias
	}
	
})(document);

