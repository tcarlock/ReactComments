/** @jsx React.DOM */

var React = require('react');
var Marked = require('marked');

module.exports = React.createClass({
  render: function() {
    var rawMarkup = Marked(this.props.children.toString());

    return (
      <li className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </li>
    );
  }
});