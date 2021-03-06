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
    // console.log('evt-->',evt.target.checked);
    // console.log('evt.target.getAttribute-->',evt.target.getAttribute('data-key'));
    var checked = evt.target.checked;
    var key = evt.target.getAttribute('data-key');
    var traverseNodes = function (node) {
      if (node.id === key) {
        node.checked = checked;
        if (node.children) { node.children.forEach(checkAllNodes); }
      }

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
  },
  render: function () {
    return (
      <ul className="checkbox-tree">
        {this.state.data.map(function (node, i) {
          return (
            <TreeNode
              key={node.id}
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
