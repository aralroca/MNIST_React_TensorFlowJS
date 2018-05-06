import React, { Component } from 'react';
import { render } from 'react-dom';
import * as tf from '@tensorflow/tfjs';
import DrawableCanvas from './drawable-canvas';
import './style.css';

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 400;
const DEFAULT_BUTTON_TEXT = 'Clear';
const DEFAULT_TITLE = 'Draw a number (0-9) here:';

export default class NumberRecognition extends Component {
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
      this.setState({ number, predictions, clear: false });

      if(typeof this.props.onPredict === 'function'){
        this.props.onPredict(number, predictions);
      }
    });
  }

  clear(){
    this.setState({
      clear: true,
    });

    if(typeof this.props.onClear === 'function'){
      this.props.onClear();
    }
  }

  render() {
    return (
      <div>
        <h5>{this.props.title || DEFAULT_TITLE}</h5>
        <div>
          <DrawableCanvas 
            brushColor={'grey'}
            clear={this.state.clear}
            height={this.props.height || DEFAULT_HEIGHT}
            lineWidth={25}
            onGetImage={this.predict}
            width={this.props.width || DEFAULT_WIDTH}
          />
        </div>
        <button onClick={this.clear}>
            {this.props.buttonText || DEFAULT_BUTTON_TEXT}
        </button>
        {
          this.props.children
            ? this.props.children(
                this.state.number, 
                this.state.predictions
              )
            : null
        }
      </div>
    );
  }
}
