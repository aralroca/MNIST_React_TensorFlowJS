import React, { Component } from 'react';
import { render } from 'react-dom';
import DrawableCanvas from './drawable-canvas';
import NumberRecognition from './number-recognition';
import './style.css';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

class App extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center'}}>
        <h4>
           Using a trained MNIST Keras model, with Tensorflow.js and React.js
        </h4>

        <NumberRecognition
           width={CANVAS_WIDTH}
           height={CANVAS_HEIGHT}
        >
        {
          (predictedNumber, predictions) => (
            <>
              <h4>Predicted number:</h4>
              <h2>{predictedNumber}</h2>
            </>
          )
        }
        </NumberRecognition>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
