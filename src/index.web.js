import React from 'react';
import { render } from 'react-dom';
import FastClick from 'fastclick';


function run() {
  const body = global.document.getElementById('application');

  const container = (
    <div>{'Hello World'}</div>
  );

  render(container, body);
}

// Run the application when both DOM is ready
// and page content is loaded
Promise.all([
  new Promise((resolve) => {
    if (global.window.addEventListener) {
      global.window.addEventListener('DOMContentLoaded', resolve);
    } else {
      global.window.attachEvent('onload', resolve);
    }
  }).then(() => FastClick.attach(global.document.body))
]).then(run);
