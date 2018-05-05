import React, { Component } from 'react';
import { render } from 'react-dom';
import * as tf from '@tensorflow/tfjs';
import DrawableCanvas from './drawable-canvas';
import './style.css';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.predict = this.predict.bind(this);
    this.clear = this.clear.bind(this);
    this.loadModel();
  }

  async loadModel(){
    this.model = await tf.loadModel('./assets/model.json');
  }

  async predict(imageData) {
    if(!this.model){
        return;
    }

    await tf.tidy(() => {
      let maxProb = 0;
      let number;
      let img = tf.fromPixels(imageData, 1);
      img = img.reshape([1, 28, 28, 1]);
      img = tf.cast(img, 'float32');
    
      const output = this.model.predict(img);
      const predictions = Array.from(output.dataSync());
        
      predictions.forEach((prob, num) => {
        if(prob > maxProb){
            maxProb = prob;
            number = num;
        }
      });
      this.setState({ number, clear: false });
    });
  }

  clear(){
    this.setState({
      clear: true,
    });
  }

  render() {
    return (
      <div style={{ textAlign: 'center'}}>
        <h4>
           Using a trained MNIST Keras model, with Tensorflow.js and React.js
        </h4>
        <h5>Draw a number (0-9) here:</h5>
        <div>
          <DrawableCanvas 
            clear={this.state.clear}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            brushColor={'grey'}
            lineWidth={25}
            onGetImage={this.predict}
          />
        </div>
        <button onClick={this.clear}>Clear</button>
        <h1>{this.state.number}</h1>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
