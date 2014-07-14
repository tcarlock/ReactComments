/** @jsx React.DOM */

var React = require('react');
var CommentBox = require('./components/comment-box.js');

React.renderComponent(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
);