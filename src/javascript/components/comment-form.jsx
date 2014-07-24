/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
	handleSubmit: function() {
    var email = this.refs.email.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();

    if (!text || !email) {
      return false;
    }

    this.refs.email.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return false;
  },

  render: function() {
    return (
      <form role="form" onSubmit={this.handleSubmit}>
			  <div className="form-group">
			    <label htmlFor="inputEmail">Email address</label>
        	<input type="text" className="form-control" placeholder="Your Name" ref="email"/>
        </div>
        <div className="form-group">
        	<label htmlFor="inputEmail">Email address</label>
        	<textarea placeholder="Your Comment" className="form-control" ref="text"/>
        </div>
        <button type="submit">Post Comment</button>
      </form>
    );
  }
});