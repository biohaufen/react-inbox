import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Toolbar extends Component {
  evalBulkSelectStyle = () => {
    switch (this.props.bulkSelectState) {
      case 'none':
        return 'fa-square-o'
      case 'all':
        return 'fa-check-square-o'
      case 'some':
        return 'fa-minus-square-o'
      default:
        return ''
    }
  }

  evalEnableState = () => {
    switch (this.props.bulkSelectState) {
      case 'none':
        return true
      case 'all':
        return false
      case 'some':
        return false
      default:
        return ''
    }
  }

  render () {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{`${this.props.totalUnreadMessageCount}`}</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={(event) => this.props.bulkSelectMessage(event)}>
            <i className={`fa ${this.evalBulkSelectStyle()}`}></i>
          </button>

          <button className="btn btn-default" disabled={this.evalEnableState()} onClick={this.props.markSelectedAsRead}>Mark As Read</button>

          <button className="btn btn-default" disabled={this.evalEnableState()} onClick={this.props.markSelectedAsUnread}>Mark As Unread</button>

          <select className="form-control label-select" disabled={this.evalEnableState()} onChange={(event) => this.props.addSelectedLabel(event)}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled={this.evalEnableState()} onChange={(event) => this.props.removeSelectedLabel(event)}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled={this.evalEnableState()} onClick={this.props.deleteSelectedMessages}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

Toolbar.propTypes = {
  bulkSelectState: PropTypes.string,
  bulkSelectMessage: PropTypes.func,
  markSelectedAsRead: PropTypes.func,
  markSelectedAsUnread: PropTypes.func,
  deleteSelectedMessages: PropTypes.func,
  addSelectedLabel: PropTypes.func,
  removeSelectedLabel: PropTypes.func,
  totalUnreadMessageCount: PropTypes.number
}

export default Toolbar
