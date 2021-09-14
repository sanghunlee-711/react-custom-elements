// https://codepen.io/BradDenver/pen/ALrXaW?editors=1010

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/root/App';

ReactDOM.render(<App />, document.getElementById('container')); //그럼 여따가 하면 안되려나 ..

// custom tags
function render(tag, Comp) {
  document.createElement(tag);

  const nodes = Array.from(document.getElementsByTagName(tag));
  nodes.map((node, i) => renderNode(tag, Comp, node, i));

  return Comp;
}

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

render('my-example', App);
