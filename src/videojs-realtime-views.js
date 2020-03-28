/**
  *
  * @method  : Class Views {}
  * @params  : (player,options)
  * @author  : <adventivepk@gmail.com> <Fahad Abbas>
  * @since   : 28/03/2020
*/
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

  /**
    *
    * @method  : createViewsComponent() this method creates and register ViewsComponents for videojs player
    * @params  : (player,options)
    * @since   : 28/03/2020
    * @returns : null
  */
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

  /**
    *
    * @method  : connectSocket() this method creates connection with socket server
    * @params  : ()
    * @since   : 28/03/2020
    * @uses    : sendMessage() , pageView()
  */
  connectSocket = () => {
    this.socket = io.connect('http://'+this.options.host+':'+this.options.port);
    this.sendMessage();
    this.pageView();
  }

  /**
    *
    * @method  : sendMessage() this method sends message to socket server on connection while listening connection
    * @params  : ()
    * @since   : 28/03/2020
  */
  sendMessage = () => {
    this.socket.on('connect', () => {
      this.socket.send(window.location);
    });
  }

  /**
    *
    * @method  : sendMessage() this method listens pageview event, emitted by socket server
    * @params  : ()
    * @since   : 28/03/2020
  */
  pageView = () => {
    this.socket.on('pageview', (message) => {
      this.connections = message.connections;
      let viewsControl = this.player.getChild('controlBar').getChild('viewsControl');
      viewsControl.setInnerHtml(viewsControl.el_,this.connections);
    });
  }
  
}

/**
    *
    * @method  : realtimeViews() videojs plugin initilization
    * @params  : ()
    * @since   : 28/03/2020
  */
function realtimeViews(options){
  new Views(this,options);
}

videojs.registerPlugin('realtimeViews',realtimeViews);