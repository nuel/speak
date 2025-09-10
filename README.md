# speak

![speak](https://github.com/user-attachments/assets/836e8532-f807-4101-8ece-9b0fab84cfd3)

A small library for making text appear as if spoken.

It types text one character at a time, knows how to handle formatting tags -- and pauses at commas and other punctuation.

Skipping is also supported, for longer texts.

Use it for _visual novels_, _twine games_, anything you can think of!

Try the [demo](https://nuel.github.io/speak/demo.html).

## Usage

Add `speak.js` to your page. Then call `speak` with any DOM element as its first argument.

```javascript
// Take any DOM element
const element = document.querySelector('.whateverElementYouWantToUse');

// Pass it to speak
speak(element);
```
_____________

### Skipping

Calling `skip` will skip to the end of the current text.

```javascript
// Skip to the end
skip();
```

_____________

### Controlling speed

Using the data attribute `data-speed`:
```html
<div class="dialog" data-speed=".3">This line will be spoken s l o w l y.</div>
```

Setting the current speed in your function call:
```javascript
// This will set the current speaking speed at 50%
speak(element, .5);
```
