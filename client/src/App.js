import React, { Component } from 'react';
import Input from './components/input';
import Title from './components/title';
import Lists from './components/lists';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import axios from 'axios';
import { tokenUrl, instanceLocator } from './config';

import './App.css';

class App extends Component {
  state = {
    items: [],
    newItem: { text: '', done: false, key: '' },
    isLoading: false
  };

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: 'chatbot',
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        currentUser.subscribeToRoom({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onMessage: message => {
              // this is a way to sync the state of key btw browsers...
              const textAndKey = message.text.split('+++');
              const addItem = {
                text: textAndKey[1],
                key: textAndKey[0],
                done: false
              };
              // update items state and clear up form input field...
              const items = [...this.state.items, addItem];
              this.setState({
                items: items,
                newItem: { text: '', key: '', done: false }
              });
              // post update to the database
              this.postItem(addItem);
            }
          },
          messageLimit: 0
        });
      })
      .catch(err => console.log('connect error', err));
    this.getItem();
  }

  getItem = () => {
    this.setState({ isLoading: true });
    axios
      .get('/api')
      .then(result => {
        this.setState({ items: result.data });
      })
      .then(err => console.log(err));
    this.setState({ isLoading: false });
  };

  postItem = item => {
    axios
      .post('/api', {
        text: item.text,
        done: item.done,
        key: item.key
      })
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  addItem = e => {
    e.preventDefault();
    const addItem = this.state.newItem;
    if (addItem.text !== '') {
      const message = addItem.key + '+++' + addItem.text;
      this.currentUser.sendMessage({
        text: message,
        roomId: this.currentUser.rooms[0].id
      });
      this.setState({ newItem: { text: '' } });
    }
  };

  handleInput = e => {
    e.preventDefault();
    const newItem = { text: e.target.value, key: Date.now(), done: false };
    this.setState({ newItem: newItem });
  };

  handleChangeItem = item => {
    console.log(item);
    const key = item.key;
    if (!item.done) {
      this.chagneToDone(key);
    } else {
      this.deleteItem(key);
    }
  };

  chagneToDone = key => {
    const index = this.state.items.findIndex(item => item.key === key);
    const changeItems = this.state.items;
    changeItems[index].done = true;
    this.setState({ items: changeItems });
  };

  deleteItem = async key => {
    const originalItems = this.state.items;
    const updatedItems = this.state.items.filter(item => {
      return item.key !== key;
    });
    this.setState({ items: updatedItems });
    try {
      await axios.delete('/api/' + key);
    } catch (e) {
      this.setState({ items: originalItems });
    }
  };

  render() {
    return (
      <div className="App">
        <Title />
        <Input
          addItem={this.addItem}
          handleInput={this.handleInput}
          newItem={this.state.newItem}
          inputElement={this.inputElement}
        />
        <Lists
          listItems={this.state.items}
          onChangeItem={this.handleChangeItem}
        />
      </div>
    );
  }
}

export default App;
