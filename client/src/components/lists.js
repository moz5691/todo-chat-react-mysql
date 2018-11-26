import React, { Component } from 'react';
import ListItem from './listItem';

class Lists extends Component {
  state = {};

  render() {
    console.log(this.props);
    const { listItems } = this.props;
    console.log(listItems);
    return (
      <div>
        <ul>
          {listItems.map((item, index) => (
            <ListItem
              key={item.key}
              item={item}
              index={index}
              onChangeItem={this.props.onChangeItem}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Lists;
