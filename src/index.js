// https://codepen.io/BradDenver/pen/ALrXaW?editors=1010

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/root/App';

function renderNode(tag, Comp, node, i) {
  let attrs = Array.prototype.slice.call(node.attributes);
  let props = {
    key: `${tag}-${i}`,
  };

  attrs.map((attr) => (props[attr.name] = attr.value));

  if (!!props.class) {
    props.className = props.class;
    delete props.class;
  }

  ReactDOM.render(<Comp {...props} />, node);
}

// custom tags
function render(tag, Comp) {
  document.createElement(tag);

  const nodes = Array.from(document.getElementsByTagName(tag));
  nodes.map((node, i) => renderNode(tag, Comp, node, i));

  return Comp;
}

render('dtime-react-element', App);
