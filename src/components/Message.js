import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <div class={`row message ${this.props.read ? 'read' : 'unread'} ${this.props.selected ? 'selected' : ''}`}>
        <div class="col-xs-1">
          <div class="row">
            <div class="col-xs-2">
              <input type="checkbox" checked={this.props.selected ? 'checked' : ''} onClick={() => this.props.toggleSelectedFlag(this.props.id)}/>
            </div>
            <div class="col-xs-2">
              <i class={`star fa ${this.props.starred ? "fa-star" : "fa-star-o"}`} onClick={() => this.props.toggleStarFlag(this.props.id)}></i>
            </div> 
          </div>
        </div>
        <div class="col-xs-11">
            {this.props.labels.map((label) => <span key={label} class="label label-warning">{label}</span>)} 
          <a href="#">{this.props.subject}</a>
        </div>
      </div>
    );
  }
}

export default Message;
