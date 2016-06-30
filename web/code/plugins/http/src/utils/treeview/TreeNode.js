import React from 'react'
var TreeNode = React.createClass({
	/* jshint ignore:start */
	getInitialState: function () {
    return {
      collapsed: true
    };
  },

  handleClick: function () {
		// console.log('handleClick tree-->');
    this.setState({
      collapsed: !this.state.collapsed
    });
  },

  render: function() {
    var containerClass = this.state.collapsed ? 'collapsed' : '';
    var node = this.props.node;
    var childNodes;

    if (node.children) {
      childNodes = node.children.map(function (child, index) {
        return (
          <ul key={[node.code, index].join('/')}>
            <TreeNode
              key={node.code}
              node={child}
              handleChange={this.props.handleChange}
            />
          </ul>
        );
      }, this);
    }

    return (
      <li className={containerClass}>
        <span onClick={this.handleClick} onTouchEnd={this.handleClick}>
          { node.children === undefined ?
            '' :
            (this.state.collapsed ? String.fromCharCode(43) : String.fromCharCode(8722))
          }
        </span>
        <input
          type="checkbox"
          checked={node.checked || false}
          onChange={this.props.handleChange}
          data-key={node.code}
        />
        <span onClick={this.handleClick} onTouchEnd={this.handleClick}>{node.label}</span>
        {childNodes}
      </li>
    );
  }
	/* jshint ignore:end */
});

module.exports = TreeNode;
