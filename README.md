# simplydialogs

**Demos and documentation here -> https://simplydialogs.github.io**

A small collection of standard dialogs: ```alert()```, ```confirm()```, ```error()```, ```info()```, ```bell()```, ```wait()``` and ```input()```. 
Built with ES6 and unicode, utilizing the native ```<dialog>``` HTML element. Works in all modern browsers. Tested with Chrome, 
Opera, Firefox and Edge (Linux & Windows 10). 

Use simplydialogs if you just need some dialogs on a minimalistic webpage - or want a quick alternative to the built-in dialogs or modals 
provided by your favourite framework, like Bootstrap, MaterializeCSS or similar. You can customize the layout so it get the look of your theme / framework. 

* No dependencies; using native &lt;dialog> element and unicode</li>
* Truly blocking interaction with background
* Stays in center of viewport, adjusted to message size, stays in focus while scrolling
* Returns promises
* Support keyboard / mouse the right way
* Customizeable
* Neat exploding / imploding effect without exaggerating
* No forced styling (beyond very basics), adopts the current "theme"
* Very small footprint, JS + CSS > ~14kb minified

## Dialogs
<table>
<tr>
<th>Type</th>
<th>Sample</th>
<th>Remarks</th>
</tr>
<tr>
<td>

```alert()```

</td>
<td><img src="assets/alert.png" width="150"></td>
<td>

```javascript
Dlg.alert('Lorem ipsum ...')
Dlg.alert('Lorem ipsum ...', options)
```
Returns promise, ex: 
```javascript
Dlg.alert('Lorem ipsum ...').then(answer => { 
  console.log(answer) //true, false if closed with ESC
})
```
</td>
</tr>
<tr>
<td>

```information()```<br>```info()```

</td>
<td><img src="assets/information.png" width="150"></td>
<td>

Same as ```alert()```

</td>
</tr>

<tr>
<td>

```confirm()```

</td>
<td><img src="assets/confirm.png" width="150"></td>
<td>

```javascript
Dlg.confirm('Lorem ipsum ...').then(answer => { 
  console.log(answer) //true or false
})
```

</td>
</tr>

<tr>
<td>

```error()```

</td>
<td><img src="assets/error.png" width="150"></td>
<td>

Same as ```alert()```

</td>
</tr>
<tr>
<td>

```bell()```

</td>
<td><img src="assets/bell.png" width="150"></td>
<td>

Same as ```alert()```

Produces a "beep"; if you not need the beep you can remove it from ```defaults```, i.e ```DEFAULTS.beep = undefined``` and save around 4k.  

</td>
</tr>
<tr>
<td>

```wait()```

</td>
<td><img src="assets/wait.png" width="150"></td>
<td>

Does not return a promise, but a function you can close the wait dialog with : 

```javascript
const wait = Dlg.wait('Lorem ipsum ...')
//do something in code
wait.close()
```

</td>
</tr>

<tr>
<td>

```input()```
```prompt()```

</td>
<td><img src="assets/input.png" width="150"></td>
<td>
Return promise holding the form state, i.e ```{ firstname: 'Arthur', age: 42 }``` 

```javascript
Dlg.input('Lorem ipsum ...', options).then(state) => {
 ... 
})
```

You can define a callback in options or ```DEFAULTS```, to determine if the user can submit :

```javascript
callback: function(state, dialog) { 
  return state.firstname !== '' 
})
```

</td>
</tr>

</table>

## Usage
Include the script and CSS.

```html
<script src="path/to/simplydialogs/dist/dialogs.min.js"></script>
<link rel="stylesheet" type="text/css" href="path/to/simplydialogs/dist/dialogs.min.css">
```

That makes a SimplyDialogs function available. For convenience, create a shorthand alias :

```javascript
const Dlg = SimplyDialogs
Dlg.alert('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
Dlg.error('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
Dlg.confirm('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
Dlg.info('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
Dlg.bell('Lorem ipsum dolor sit amet, consectetur adipiscing elit')

const wait = Dlg.wait('Lorem ipsum dolor sit amet, consectetur adipiscing elit')
wait.close()

Dlg.input('Lorem ipsum dolor sit amet, consectetur adipiscing elit').then(formState => {
  console.log(formState)
})
```


