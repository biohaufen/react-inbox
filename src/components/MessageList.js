import React, { Component } from 'react';
import Message from "./Message";

class MassageList extends Component {
    
    render () {
        return (
            <div>
            {this.props.messages.map((message) => <Message key={message.id} id={message.id} subject={message.subject} selected={message.selected} read={message.read} starred={message.starred} labels={message.labels} toggleStarFlag={this.props.toggleStarFlag} toggleSelectedFlag={this.props.toggleSelectedFlag}/>)}
            </div>
        )
    }
}

export default MassageList;