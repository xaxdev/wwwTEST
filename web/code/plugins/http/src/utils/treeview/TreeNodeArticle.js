import React from 'react'
var TreeNode = React.createClass({
	/* jshint ignore:start */
	getInitialState: function () {
		return { collapsed: true };
	},
	handleClick: function () {
		this.setState({ collapsed: !this.state.collapsed });
	},
	render: function() {
		var containerClass = this.state.collapsed ? 'collapsed' : '';
      	var node = this.props.node;
      	var childNodes;
  		let isChecked = false;
  		let lineThrough = '';

		if (node.children) {
			childNodes = node.children.map(function (child, index) {
				isChecked = !!child.checked
        		  				? child.checked
        							? isChecked || true
        							: isChecked || false
        						: isChecked || false;
                return (
					<ul key={[node.code, index].join('/')}>
						<TreeNode key={node.code} node={child} handleChange={this.props.handleChange} />
                    </ul>
				);
			}, this);
		}

		if (node.checked != undefined) {
	  		containerClass = '';
	  	}
		// console.log('node.checked-->',node.checked);
		return (
			<li className={containerClass}>
				<span onClick={this.handleClick} onTouchEnd={this.handleClick}>
					{ node.children === undefined
						? ''
						: (this.state.collapsed ? String.fromCharCode(94) : String.fromCharCode(118))
				  	}
				</span>
				<input type="checkbox" checked={node.checked || false} onChange={this.props.handleChange}
					data-key={node.code} disabled={node.checked == undefined ? false : node.checked ? false: true}/>
				<span className={node.checked == undefined ? '' : node.checked ? '': 'lineThrough'} onClick={this.handleClick}
					onTouchEnd={this.handleClick}>{node.label}</span>
				{childNodes}
            </li>
		);
    }
	/* jshint ignore:end */
});

module.exports = TreeNode;
