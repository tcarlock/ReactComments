/** @jsx React.DOM */

var React = require('react');
var CommentList = require('./comment-list.js');
var CommentForm = require('./comment-form.js');

module.exports = React.createClass({
	loadCommentsFromServer: function() {
		$.ajax({
  		url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
  	});
	},

	handleCommentSubmit: function(comment) {
    // TODO: submit to the server and refresh the list
  },

	getInitialState: function() {
    return {data: []};
  },

  componentWillMount: function() {
  	this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="col-sm-6 col-sm-offset-3 comment-box">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={handleCommentSubmit} />
      </div>
    );
  }
});