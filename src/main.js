function update() {
	React.renderComponent(
	  <CommentBox url="comments.json" pollInterval={2000} />,
	  document.getElementById('content')
	);
}