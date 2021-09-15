// https://codepen.io/BradDenver/pen/ALrXaW?editors=1010

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/root/App';

interface CompProps {
  name?: string;
}

interface IAttrs {
  name: string;
  value: string;
}

interface IProps extends CompProps {
  key: string;
  class?: string;
  className?: string;
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
    const key: typeof props = attr.name;

    return (props[key] = attr.value);
  });

  if (!!props.class) {
    props.className = props.class;
    delete props.class;
  }

  ReactDOM.render(<Comp {...props} />, node);
}

// custom tags
function render(tag: string, Comp: React.FC<Iprops>) {
  document.createElement(tag);

  const nodes: Element[] = Array.from(document.getElementsByTagName(tag));
  nodes.map((node, i) => renderNode(tag, Comp, node, i));

  return Comp;
}

render('dtime-react-element', App);
