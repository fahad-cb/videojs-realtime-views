# Videojs Realtime Views
This plugin adds an option in player controls to see realtime views for a video

# Presequites
```bash 
nodejs
```
```bash
socket.io
```


## Scoket Server
Run socket server (socket.io required) 
```node
node socketserver/index.js
```
 
## Usage

Add video js source and plugin source in your html
```html
<link href="http://vjs.zencdn.net/{version}/video-js.css" rel="stylesheet">
<script src="http://vjs.zencdn.net/{version}/video.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
<script src='../src/videojs-realtime-views.js'></script>
```

Initialize your player and plugin
```javascript
var player = videojs('example-video');
//load the views plugin
player.realtimeViews({
  host : '127.0.0.1',
  port : 3000,
});
```


# preview (demo)

![player](https://github.com/fahad-cb/videojs-realtime-views/blob/master/videojs-realtime-views.png)
