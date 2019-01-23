# mnist-react-tfjs 
## Number recognition with MNIST data (React.js and TensorFlow.js)

![npm version](https://img.shields.io/badge/npm-v0.1.0-blue.svg) 

Predict numbers using MNIST database with **TensorFlow.js** and **React.js**!

*author: Aral Roca <aral-rg@hotmail.com>*

## DEMO

* http://aralroca.github.io/MNIST_React_TensorFlowJS

![demo](https://aralroca.github.io/MNIST_React_TensorFlowJS/assets/behavior.gif)


## Requirements

* react - Recommended ^16.7.0
* react-dom - Recommended ^16.7.0
* @tensorflow/tfjs - Recommended ^0.14.2

## Getting started

* > npm install --save mnist-react-tfjs
* > import NumberRecognition from 'mnist-react-tfjs';

## Code

### With RenderProps:

````
<NumberRecognition
    width={400}
    height={400}
>
{
    (predictedNumber, predictions) => (
        <h1>{predictedNumber}</h1>
    )
}
</NumberRecognition>
````

### Without RenderProps:

````
<NumberRecognition
    width={400}
    height={400}
    onPredict={
        (number, predictions) => 
        console.log(number, predictions)
    }
    onClear={() => console.log('onClear')}
/>
````
