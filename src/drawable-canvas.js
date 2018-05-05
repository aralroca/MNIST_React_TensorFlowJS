import React, { Component } from 'react';
import { render } from 'react-dom';

export default class DrawableCanvas extends Component {
  constructor(props){
    super(props);
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnTouchStart = this.handleOnTouchStart.bind(this);
    this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
    this.handleOnTouchMove = this.handleOnTouchMove.bind(this);
    this.handleonMouseUp = this.handleonMouseUp.bind(this);
  }

  componentDidMount(){
    this.ctx = this.canvas.getContext('2d');
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.clear){
      this.resetCanvas();
    }
  }

  resetCanvas(){
    this.ctx.clearRect(
      0, 0, this.ctx.canvas.width,   this.ctx.canvas.height
    );
  }

   handleOnTouchStart (e) {
    const rect = this.canvas.getBoundingClientRect();
    this.ctx.beginPath();
    
    this.lastX = e.targetTouches[0].pageX - rect.left;
    this.lastY = e.targetTouches[0].pageY - rect.top;
    this.drawing = true;
  }

  handleOnMouseDown(e){
    const rect = this.canvas.getBoundingClientRect();
    this.ctx.beginPath();

    this.lastX = e.clientX - rect.left;
    this.lastY = e.clientY - rect.top;
    this.drawing = true;
  }

  handleOnTouchMove (e) {
    if (this.drawing) {
      const rect = this.canvas.getBoundingClientRect();
      const lastX = this.lastX;
      const lastY = this.lastY;
      let currentX = e.targetTouches[0].pageX - rect.left;
      let currentY = e.targetTouches[0].pageY - rect.top;
      this.draw(lastX, lastY, currentX, currentY);
      this.lastX = currentX;
      this.lastY = currentY;
    }
  }

  handleOnMouseMove(e){
    if(this.drawing){
      const rect = this.canvas.getBoundingClientRect();
      const lastX = this.lastX;
      const lastY = this.lastY;
      let currentX = e.clientX - rect.left;
      let currentY = e.clientY - rect.top;

      this.draw(lastX, lastY, currentX, currentY);
      this.lastX = currentX;
      this.lastY = currentY;
    }
  }

  handleonMouseUp() {
    this.ctx.drawImage(this.canvas, 0, 0, 28, 28);
    this.drawing = false;

    if(typeof this.props.onGetImage === 'function'){
      this.props.onGetImage(this.ctx.getImageData(0, 0, 28, 28));
    }
  }

  draw(lX, lY, cX, cY) {
    const newContext = this.ctx;
    newContext.strokeStyle = this.props.brushColor;
    newContext.lineWidth = this.props.lineWidth;
    this.ctx =  newContext;
    this.ctx.moveTo(lX, lY);
    this.ctx.lineTo(cX, cY);
    this.ctx.stroke();
  }

  render() {
    const style = {
      cursor: 'crosshair',
      border: '1px black solid',
    };

    return (
        <canvas 
          ref={(canvas) => {this.canvas = canvas; }}
          width={this.props.width}
          style={style}
          height={this.props.height}
          onMouseDown = {this.handleOnMouseDown}
          onTouchStart = {this.handleOnTouchStart}
          onMouseMove = {this.handleOnMouseMove}
          onTouchMove = {this.handleOnTouchMove}
          onMouseUp = {this.handleonMouseUp}
          onTouchEnd = {this.handleonMouseUp}
        />
    );
  }
}

