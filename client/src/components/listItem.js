import React, { Component } from 'react';

class ListItem extends Component {
  state = {};

  //

  render() {
    // console.log(this.props);
    const { text } = this.props.item;
    return (
      <React.Fragment>
        <li>
          <div className="row">
            <div className="col s11">
              <span className={this.getTextClass()}>{text}</span>
            </div>
            <div className="col s1">
              <span className="button-icon">
                <i
                  onClick={() => this.props.onChangeItem(this.props.item)}
                  className={this.getButtonClass()}
                />
              </span>
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  }
  getButtonClass() {
    const buttonClass = this.props.item.done
      ? 'far fa-times-circle fa-2x'
      : 'far fa-circle fa-2x';
    return buttonClass;
  }
  getTextClass() {
    const textClass = this.props.item.done
      ? 'text-completed'
      : 'text-uncompleted';
    return textClass;
  }
}

export default ListItem;
