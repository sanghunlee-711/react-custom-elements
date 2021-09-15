// https://codepen.io/BradDenver/pen/ALrXaW?editors=1010

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/root/App';
import { CompProps } from './model/types';

interface IAttrs {
  [key: string]: string;
}

interface IProps extends CompProps {
  [key: string]: string | undefined;
}

function renderNode(
  tag: string,
  Comp: React.FC<CompProps>,
  node: Element,
  i: number
) {
  let attrs: IAttrs[] = Array.prototype.slice.call(node.attributes);
  let props: IProps = {
    key: `${tag}-${i}`,
  };

  attrs.map((attr) => {
    return (props[attr.name] = attr.value);
  });

  if (!!props.class) {
    props.className = props.class;
    delete props.class;
  }

  ReactDOM.render(<Comp {...props} />, node);
}

// custom tags
function render(tag: string, Comp: React.FC<CompProps>) {
  document.createElement(tag);

  const nodes: Element[] = Array.from(document.getElementsByTagName(tag));
  nodes.map((node, i) => renderNode(tag, Comp, node, i));

  return Comp;
}

render('dtime-react-element', App);
