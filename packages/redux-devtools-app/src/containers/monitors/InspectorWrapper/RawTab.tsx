import React, { Component, useState } from 'react';
import { Editor } from '@redux-devtools/ui';
import { stringify } from 'javascript-stringify';
import fuzzysort from 'fuzzysort'

interface Props {
  data: unknown;
}

interface SP {
  data: string | undefined
}
const Search = (props: SP) => {
  const [value, setValue] = useState("");

  return (
    <div>
      <input placeholder='search' onChange={(e) => {
        const data = props.data ?? "";
        const r = fuzzysort.single(e.target.value, data);
        // @ts-ignore: no se que hacer
        setValue(fuzzysort.highlight(r, '<b>', '</b>') ?? props.data)
      }}
      />
      <Editor value={value} />

    </div>


  )
}
export default class RawTab extends Component<Props> {
  value?: string | undefined;

  constructor(props: Props) {
    super(props);
    this.stringifyData(props);
  }

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.data !== this.value;
  }

  UNSAFE_componentWillUpdate(nextProps: Props) {
    this.stringifyData(nextProps);
  }

  stringifyData(props: Props) {
    this.value = stringify(props.data, null, 2);
  }

  render() {
    return (
      <div>
        <Search data={this.value} />
      </div>
    )
  }
}
