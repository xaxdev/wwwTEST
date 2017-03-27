import React from 'react'
var TreeNode = require('./TreeNode');

var Tree = React.createClass({
	/* jshint ignore:start */
  getInitialState: function () {
    return {
      data: this.props.data
    };
  },

  handleChange: function (evt) {
    // console.log('handleChange evt-->',(evt.target != undefined)?evt.target.checked:evt.checked);
    // console.log('evt.target.getAttribute-->',evt.target.getAttribute('data-key'));
    // var checked = evt.target.checked;
	if (!evt[0]) {

	}else{

	}
	var checked = (evt.target != undefined)
					? evt.target.checked
					: (evt.checked != undefined)
						? evt.checked
						: evt[0].checked;
    var key = (evt != undefined)
				? (evt.target != undefined)
					? evt.target.getAttribute('data-key')
					: (evt.key != undefined)
						? evt.key
						: evt[0].code
				: '';
    var traverseNodes = function (node) {
		// Check true at Node
      if (node.code === key) {
        node.checked = checked;
        if (node.children) { node.children.forEach(checkAllNodes); }
      }

	  // Check true at children
      if (node.children) {
        node.children.forEach(traverseNodes);
      }
    };

    var checkAllNodes = function (node) {
      node.checked = checked;
      if (node.children) { node.children.forEach(checkAllNodes); }
    };

    // var dataSource = Object.create(this.state.data);
    // dataSource.forEach(traverseNodes);
    // this.setState({ data: dataSource });

    this.state.data.forEach(traverseNodes);
    this.setState(this.state.data);

		if (this.props.onClick) {
		  this.props.onClick(this.state.data);
		}
		if (this.props.onUnClick) {
		  this.props.onClick(this.state.data);
		}
  },
  render: function () {
    return (
      <ul className="checkbox-tree">
        {this.state.data.map(function (node, i) {
          return (
            <TreeNode
              key={node.code}
              node={node}
              handleChange={this.handleChange}
            />
          );
        }, this)}
      </ul>
    );
  }
  /* jshint ignore:end */
});

module.exports = Tree;
