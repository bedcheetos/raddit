# raddit
This add-on for firefox changes the style of raddle.me, so it looks more like reddit.

This is achieved by replacing the thumbnails with the source images and using CSS to make it more appealing.

![preview of raddit](https://addons.mozilla.org/user-media/previews/full/284/284207.png?modified=1687818896)

As mentioned, it uses the source of the images, which are well accessible on raddle, but only if the "When clicking submission links..." is set to "Open the linked content".
Otherwise, this extension doesn't work.

![this setting specifically](https://addons.mozilla.org/user-media/previews/thumbs/284/284208.jpg?modified=1687818894)

It is also advised to disable the full-width display option on raddle.

![preview of that](https://addons.mozilla.org/user-media/previews/thumbs/284/284209.jpg?modified=1687818894)

## Permissions
The extension only accesses raddle.me and is activated when the site is visited. 
Specifically, the extension uses the host permission on raddle.me to inject a CSS stylesheet and change the HTML document. No user data is tracked, used, or accessed.

## Performance
Since the extension uses the direct sources of the images, it is much less performant than raddle as is. 
Even though the images lazy load and only when in view, they can lag a little.

## Download
you can download the extension (only for firefox) [here](https://addons.mozilla.org/en-US/firefox/addon/raddit/)
