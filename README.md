# Number recognition with MNIST data (React.js and TensorFlow.js)

This repo is a POC about using a trained Keras model with MNIST database with **TensorFlow.js** and **React.js**!

## Getting started

* yarn install
* npm start


## DEMO

* http://aralroca.github.io/MNIST_React_TensorFlowJS

![demo](https://aralroca.github.io/MNIST_React_TensorFlowJS/assets/behavior.gif)

# Code

## With RenderProps:

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

## Without RenderProps:

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