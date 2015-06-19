var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var AppLeftNav = require('./common/AppLeftNav');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var mui = require('material-ui');
var { AppBar, AppCanvas, Menu, IconButton } = mui;

var flux = require('../scripts/app');



var App = React.createClass({
  mixins: [Reflux.ListenerMixin],
  componentDidMount: function() {
    //Listen to any change from the store (@trigger() in the store)
    this.listenTo(flux.store, this.onChangeStore);
  },
  getInitialState: function() {
    console.log(flux.store.getInitialState());
    return flux.store.getInitialState();
  },
  onChangeStore: function(storeData) {
    //Store has changed => update the view.
    console.log('onChangeStore, setState', storeData);
    this.setState(storeData);
  },
  render: function() {
    console.log('Render the top level component.');
    return (
      <AppCanvas predefinedLayout={1}>
        <AppBar
           title={ 'bestof.js.org' }
           className="mui-dark-theme"
           onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
           onMenuIconButtonTouchTap={this._onLeftIconButtonTouchTap}
           zDepth={0}
        >
        </AppBar>

        <AppLeftNav ref="leftNav" />

        <div className="container">
          <RouteHandler
            projects={ this.state.projects }
            popularProjects={ this.state.popularProjects }
            hotProjects={ this.state.hotProjects }
            tags={ this.state.tags }
            selectedTag={ this.state.selectedTag }
            selectedSort={ this.state.selectedSort }
            project={ this.state.project }
            tag={ this.state.tag }
          />
        </div>

      </AppCanvas>
    );
  },

  _onLeftIconButtonTouchTap: function() {
    console.log('tap!');
    this.refs.leftNav.toggle();
  },


});

App.contextTypes = {
  router: React.PropTypes.func
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = App;