import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import PureInput from '../../utils/PureInput';
import Tree from '../../utils/treeview/Tree';
import TreeNode from '../../utils/treeview/TreeNode';
import TreeData from '../../utils/treeview/TreeDataStone.js';

class InventoryStoneFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: TreeData
    }
  }
  shouldComponentUpdate(nextProps) {
    return this.props.stoneType !== nextProps.stoneType||
      this.props.cut !== nextProps.cut
  }
  // handleChange(evt) {
  //   console.log('evt-->',evt.target.checked);
  //   console.log('evt.target.getAttribute-->',evt.target.getAttribute('data-key'));
  //   var checked = evt.target.checked;
  //   var key = evt.target.getAttribute('data-key');
  //   var traverseNodes = function (node) {
  //     if (node.id === key) {
  //       node.checked = checked;
  //       if (node.children) { node.children.forEach(checkAllNodes); }
  //     }
  //
  //     if (node.children) {
  //       node.children.forEach(traverseNodes);
  //     }
  //   };
  //
  //   var checkAllNodes = function (node) {
  //     node.checked = checked;
  //     if (node.children) { node.children.forEach(checkAllNodes); }
  //   };
  //
  //   // var dataSource = Object.create(this.state.data);
  //   // dataSource.forEach(traverseNodes);
  //   // this.setState({ data: dataSource });
  //
  //   TreeData.forEach(traverseNodes);
  //   this.setState({data:TreeData});
  //   console.log(this.state.data);
  //   this.render();
  // }
  render() {
    const { stoneType, cut } = this.props;
    console.log('this.state.data-->',this.state.data);
    return(
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Stone Type</label>
                    <PureInput type="text" className="form-control" field={stoneType} />
                  </div>
                  <div className="form-group">
                    <label>Tree Menu</label>
                    <Tree data={TreeData} />
                    {/*<ul className="checkbox-tree">
                      {this.state.data.map(function (node, i) {
                        console.log('in function');
                        var that = this;
                        return (
                          <TreeNode
                            key={node.id}
                            node={node}
                            handleChange={that.handleChange.bind(that)}
                          />
                        );
                      }, this)}
                    </ul>*/}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Cut (Shape)</label>
                    <PureInput type="text" className="form-control" field={cut} />
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  }
}
InventoryStoneFilter.propTypes = {
  stoneType: PropTypes.object.isRequired,
  cut: PropTypes.object.isRequired
}
export default InventoryStoneFilter;
