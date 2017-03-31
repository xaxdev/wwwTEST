import React from 'react'
var TreeNode = React.createClass({
	/* jshint ignore:start */
	getInitialState: function () {
    return {
      collapsed: true
    };
  },

  handleClick: function () {
		// console.log('handleClick tree-->',this.state.collapsed);
    this.setState({
      collapsed: !this.state.collapsed
    });
  },

  render: function() {
	//   console.log(this.state);
    var containerClass = this.state.collapsed ? 'collapsed' : '';
    var node = this.props.node;
    var childNodes;
	let isChecked = false;

    if (node.children) {
		// console.log('node-->',node.checked);
      childNodes = node.children.map(function (child, index) {
		  isChecked = !!child.checked ? child.checked ? isChecked || true : isChecked || false : isChecked || false;
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
	// console.log('isChecked-->',isChecked);
	if (!!node.checked) {
		// console.log('node-->',node.checked);
		containerClass = '';
	}
	// if (isChecked) {
	// 	switch (node.label) {
	// 		case 'Spare':
	// 			containerClass = '';
	// 			break;
	// 		case 'OBA':
	// 			containerClass = '';
	// 			break;
	// 		case 'Accessories':
	// 			containerClass = '';
	// 			break;
	// 		case 'Stone':
	// 			containerClass = '';
	// 			break;
	// 		case 'Watch':
	// 			containerClass = '';
	// 			break;
	// 		case 'Jewelry':
	// 			containerClass = '';
	// 			break;
	// 		default:
	//
	// 	}
	// }

    return (
      <li className={containerClass}>
        <span onClick={this.handleClick} onTouchEnd={this.handleClick}>
          { node.children === undefined ?
            '' :
            (this.state.collapsed ? String.fromCharCode(94) : String.fromCharCode(118))
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
