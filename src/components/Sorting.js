import React, { Component } from 'react';
import './Sorting.css';

const numItems = 7;

class Item extends Component {
  render() {
    const { itemIndex, itemValue, selectedItemIndex } = this.props;
    return (
      <div
        className={"item" + (selectedItemIndex === itemIndex ? " selected" : "")}
        onClick={() => this.props.onSelectItem(itemIndex)}
       >
        {itemValue}
      </div>
    )
  }
}

class Slot extends Component {
  render() {
    const { slotIndex, onSelectSlot } = this.props;
    return (
      <div className="slot" onClick={() => onSelectSlot(slotIndex)}>X</div>
    )
  }
}

class Sorting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      moves: 0,
      selectedItemIndex: undefined,
      slots: [],
    }
    this.onSelectItem = this.onSelectItem.bind(this);
    this.onSelectSlot = this.onSelectSlot.bind(this);
    this.done = this.done.bind(this);
  }

  componentDidMount() {
    const items = [];
    const slots = [];
    for (let i = 0; i < numItems; i++) {
      items.push(Math.floor(Math.random() * 100));
      slots.push(undefined);
    }
    this.setState({ items, slots });
  }

  onSelectItem(itemIndex) {
    const { moves, selectedItemIndex, slots } = this.state;
    if (itemIndex === selectedItemIndex) {
      this.setState({ selectedItemIndex: undefined });
    } else if (selectedItemIndex !== undefined) {
      const oldSlotIndex = slots.findIndex(slot => slot === selectedItemIndex);
      const newSlotIndex = slots.findIndex(slot => slot === itemIndex);
      slots[oldSlotIndex] = itemIndex;
      slots[newSlotIndex] = selectedItemIndex;
      this.setState({ moves: moves + 1, selectedItemIndex: undefined, slots });
    }
    else {
      this.setState({ selectedItemIndex: itemIndex });
    }
  }

  onSelectSlot(slotIndex) {
    const { moves, selectedItemIndex, slots } = this.state;
    if (selectedItemIndex !== undefined) {
      const oldIndex = slots.findIndex(slot => slot === selectedItemIndex);
      if (oldIndex !== -1) { slots[oldIndex] = undefined; }
      slots[slotIndex] = selectedItemIndex;
      this.setState({ moves: moves + 1, selectedItemIndex: undefined, slots });
    }
  }

  done() {
    const { items, slots } = this.state;
    return slots.every((itemIndex, slotIndex) => {
      if (itemIndex === undefined) { return false; }
      if (slotIndex > 0 && items[slots[slotIndex-1]] > items[itemIndex]) { return false; }
      return true;
    })
  }

  render() {
    const { items, moves, selectedItemIndex, slots } = this.state;
    const nextItemIndex = items.findIndex((item, itemIndex) => !slots.includes(itemIndex));
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Algorithms to Live By - Sorting</h1>
          <button onClick={() => this.props.chooseGame(1)}>Switch Game</button>
        </header>
        <p className="App-intro">
          You are presented with {numItems} random integers between 0 and 99, one at a time. Try to sort them in the fewest moves possible.
        </p>
        <p>Moves: {moves}</p>
        <div className="items">
          {nextItemIndex !== -1 ?
            <Item
              itemIndex={nextItemIndex}
              itemValue={items[nextItemIndex]}
              selectedItemIndex={selectedItemIndex}
              onSelectItem={this.onSelectItem}
            />
            : <Slot onSelectSlot={this.onSelectSlot} />}
        </div>
        <hr />
        <div className={"slots" + (this.done() ? " done" : "")}>
          {slots.map((itemIndex, slotIndex) => {
            return itemIndex === undefined ?
              <Slot
                key={slotIndex}
                slotIndex={slotIndex}
                onSelectSlot={this.onSelectSlot}
              />
              : <Item
                key={slotIndex}
                itemIndex={itemIndex}
                itemValue={items[itemIndex]}
                selectedItemIndex={selectedItemIndex}
                onSelectItem={this.onSelectItem}
              />
          })}
        </div>
      </div>
    );
  }
}

export default Sorting;
