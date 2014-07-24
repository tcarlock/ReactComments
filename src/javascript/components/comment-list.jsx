/** @jsx React.DOM */

var React = require('react');
var Comment = require('./comment.js');

module.exports = React.createClass({
  render: function() {
  	var commentNodes = this.props.data.map(function(comment) {
  		return (
  			<Comment author={comment.author}>
  				{comment.text}
  			</Comment>
  		);
  	});

    return (
      <ul className="commentList">
        {commentNodes}
      </ul>
    );
  }
});