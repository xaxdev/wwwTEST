import React from 'react'
import _ from 'underscore';

export default function TransformOptions(options){
  // console.log('options-->',options);
  var option = function(value, label, render, disabled = false) {
    return {value, label, render, disabled};
  }
  const transformOptions = options => _.reduce(options, (res, el) => {
    const parent = option(el.text, el.text, (<strong>{el.text}</strong>), true);
    const children = _.map(el.children, child => _.assign(
      {}, option(child.id, child.text, (<span style={{paddingLeft: 10}}>{child.text}</span>)), {parent: el.text}
    ));

    return res.concat(parent).concat(children);
  }, []);

  return transformOptions(options);
}
