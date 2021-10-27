import React from 'react';
import logo from './logo.svg';
import './App.css';


// 3. Write a single file Vue component which consists of an 8*8 grid which has inside of it a 1*1 square, implement drag and drop abilities for that square so that it's movable inside the grid.

  //  - You are allowed to use vuetify for this component.
  //  - You are not allowed to use any external NPM library to solve this problem.
  //  - BONUS: Design the component to look good including good UX.

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: new Array(8 * 8).fill(null),
      boxes: {},
      target: null,
      isDragging: false,
    }
    const boxPlace = Math.floor(Math.random() * this.state.cells.length);
    this.state.cells[boxPlace] = <div className="text-white p-4">x</div>;
  }

  moveItem = (sourceIndex) => () => {
    const { cells, target } = this.state;
    const newCells = [...cells];
    if (target) {
      console.log(target)
      newCells[target] = cells[sourceIndex];
      newCells[sourceIndex] = cells[target];
      this.setState({ cells: newCells }, () => {
        this.setState({ target: null});
        this.setState({ isDragging: false });
      });
    } else {
      this.setState({ target: null});
      this.setState({ isDragging: false });
    }
  };

  selectItem = (i) => () => {
    this.setState({ isDragging: true });
  };

  setTargetDecorator = i => () => {
    this.setState({ target: i })
    console.log('You are hovering over', i)
  }

  removeTargetDecorator = i => () => {
    const { initialTarget } = this.state;
    this.setState({ target: initialTarget })
    console.log('You are not hovering over', i)
  }

  renderGrid = () => {
    const { cells } = this.state;
    return cells.map((cell, i) => {
      const key = `box${i}`
      return (
        <div 
          key={key}
          className="rounded p-4 border-2 border-green-700 bg-green-800"
          onDragOver={this.setTargetDecorator(i)}
          onDragLeave={this.removeTargetDecorator(i)}  
        >
          <div 
            className="bg-green-700 hover:bg-green-600 cursor-pointer select-none"
            draggable
            onDragStart={this.selectItem(i)}
            onDragEnd={this.moveItem(i)}
          >
            {cell ? cell : null}
          </div>
        </div>
      )
    });
  };


  render() {
    return (
      <div className="w-screen h-screen flex flex-row justify-center bg-green-900 p-4">
        <div className="grid grid-cols-8 gap-4">
          {this.renderGrid()}
        </div>
      </div>
    );
  };
}

export default App;
