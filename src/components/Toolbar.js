import React, { Component } from "react";

class Toolbar extends Component {

  evalBulkSelectStyle = () => {
    switch (this.props.bulkSelectState) {
      case "none":
        return 'fa-square-o'
      case "all":
        return 'fa-check-square-o'
      case "some":
        return 'fa-minus-square-o'
      default: 
        return ''
    }
  }

  render() {
    return (
      <div class="row toolbar">
        <div class="col-md-12">
          <p class="pull-right">
            <span class="badge badge">2</span>
            unread messages
          </p>

          <button class="btn btn-default" onClick={(event) => this.props.bulkSelectMessage(event)}>
            <i class={`fa ${this.evalBulkSelectStyle()}`}></i>
          </button>

          <button class="btn btn-default">Mark As Read</button>

          <button class="btn btn-default">Mark As Unread</button>

          <select class="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select class="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button class="btn btn-default">
            <i class="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Toolbar;
