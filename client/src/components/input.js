import React, { Component } from 'react';

class Input extends Component {
  // componentDidUpdate() {
  //   this.props.inputElement.current.focus();
  // }
  render() {
    return (
      <div className="todoInput">
        <form onSubmit={this.props.addItem}>
          <input
            className="input-field"
            style={{ fontSize: '30px' }}
            onChange={this.props.handleInput}
            /* ref={this.props.inputElement} */
            value={this.props.newItem.text}
            type="text"
            placeholder="Enter Your Task"
            name="name"
          />
          {/* <button type="submit">Add Task</button> */}
        </form>
      </div>
    );
  }
}

export default Input;
