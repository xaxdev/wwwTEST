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
	var checked = null;
	var key = null;

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

	if (!!evt[0]) {
		// if data from save search db
		// console.log(evt.length);
		evt.map((val,i) => {
			// console.log(val);
			// console.log(i);
			checked = val.checked;
			key = val.code;
			this.state.data.forEach(traverseNodes);
		})
	}else{
		// if data from web by click on hierarchy
		checked = (evt.target != undefined)
						? evt.target.checked
						: (evt.checked != undefined)
							? evt.checked
							: evt[0].checked;
	    key = (evt != undefined)
					? (evt.target != undefined)
						? evt.target.getAttribute('data-key')
						: (evt.key != undefined)
							? evt.key
							: evt[0].code
					: '';
		// set primary node false
		if(!checked){
			this.state.data[0] = {...this.state.data[0], checked: false};
		}

		this.state.data.forEach(traverseNodes);

		// set primary node true
		const childrens = this.state.data[0].children.length;
		let counts = 0;
		this.state.data[0].children.map((val) => {
			if (val.checked) {
				counts++;
				if (counts == childrens) {
					this.state.data[0] = {...this.state.data[0], checked: true};
				}
			}
		})
	}

	// var dataSource = Object.create(this.state.data);
	// console.log('dataSource-->',dataSource);
	// dataSource.forEach(traverseNodes);
	// this.setState({ data: dataSource });

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
