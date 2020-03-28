class Views {

  //constructing class
  constructor (player,options){
    this.options = options;
    this.player = player;
    this.socket = null;
    this.connections = 0;
    this.createViewsComponent();
    this.connectSocket();
    
  }

  createViewsComponent = () => {
    //registerring component
    var component = videojs.getComponent('Component');
    videojs.registerComponent('viewsControl',videojs.extend( component , {
      classList : ["vjs-views-menu-button","vjs-control","vjs-button"],
      constructor : function(player,options) {
        component.call(this, player, options);
        for (let i=0; i<this.classList.length; i++ ){
          this.addClass(this.classList[i]);
        }
      },
      setInnerHtml : function (el,connections){
        el.innerHTML = '<span class="glyphicon glyphicon-eye-open"> '+connections+'</span>';
        el.style.marginTop = '7px';
      },
    }));
    
    //adding child viewcontrol
    let controlBar = this.player.getChild('controlBar');
    controlBar.addChild('viewsControl');
    let fullscreenToggle = controlBar.getChild('fullscreenToggle');
    let viewsControl = controlBar.getChild('viewsControl');

    //moving viewControl before fullscreenToggle
    controlBar.el().insertBefore(viewsControl.el(), fullscreenToggle.el());
  }

  // connecting socket 
  connectSocket = () => {
    this.socket = io.connect('http://'+this.options.host+':'+this.options.port);
    this.sendMessage();
    this.pageView();
  }

  // listen connection event
  sendMessage = () => {
    this.socket.on('connect', () => {
      this.socket.send(window.location);
    });
  }

  // listen listeniing page view event
  pageView = () => {
    this.socket.on('pageview', (message) => {
      this.connections = message.connections;
      let viewsControl = this.player.getChild('controlBar').getChild('viewsControl');
      viewsControl.setInnerHtml(viewsControl.el_,this.connections);
    });
  }
  
}

// plugin base functions
function realtimeViews(options){
  new Views(this,options);
}

videojs.registerPlugin('realtimeViews',realtimeViews);