import React, { Component, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Base16Theme } from 'base16';
import { defaultStyle, themedStyle } from './styles';
import { Theme } from '../themes/default';
import { keymap, EditorView } from "@codemirror/view"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import { search, searchKeymap } from "@codemirror/search"
import doc from './data';

// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/addon/fold/foldgutter';
// import 'codemirror/addon/fold/foldcode';
// import 'codemirror/addon/fold/brace-fold';

// import '../../fonts/index.css';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/addon/fold/foldgutter.css';

const EditorContainer = styled.div(
  '' as unknown as TemplateStringsArray,
  ({ theme }: { theme: Theme }) =>
    theme.scheme === 'default' && theme.light
      ? defaultStyle
      : themedStyle(theme)
);

export interface EditorProps {
  value: string;
  mode: string;
  lineNumbers: boolean;
  lineWrapping: boolean;
  readOnly: boolean;
  theme?: Base16Theme;
  foldGutter: boolean;
  autofocus: boolean;
  onChange?: (value: string, change: unknown) => void;
}

/**
 * Based on [CodeMirror](http://codemirror.net/).
 */
export default class Editor extends Component<EditorProps> {
  cm?: unknown | null;
  node?: HTMLDivElement | null;

  componentDidMount() {
    // this.cm = new EditorView(this.node!, {
    //   value: this.props.value,
    //   mode: this.props.mode,
    //   lineNumbers: this.props.lineNumbers,
    //   lineWrapping: this.props.lineWrapping,
    //   readOnly: this.props.readOnly,
    //   autofocus: this.props.autofocus,
    //   foldGutter: this.props.foldGutter,
    //   gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    // });
    // let map = searchKeymap
    //   searchKeymap['']
    this.cm = new EditorView({
      doc,
      extensions: [
        history(),
        search(),
        keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap]),
      ],
      // @ts-ignore i don't know what to do
      parent: document.getElementById("editor")
    })

    // if (this.props.onChange) {
    //   this.cm.on('change', (doc, change) => {
    //     this.props.onChange!(doc.getValue(), change);
    //   });
    // }
  }

  UNSAFE_componentWillReceiveProps(nextProps: EditorProps) {
    // const data = this.props.value;
    // const state = EditorState.create()
    // state.update()
    // // const initialState = cmlib.EditorView.crea createEditorState("function foo() {\n    console.log(123);\n}");
    // // @ts-ignore i don't know what to do
    // this.cm.setState(state);


    // this.cm.setState(nextProps.value);

    // if (nextProps.value !== this.cm.getValue()) {
    // }
    // if (nextProps.readOnly !== this.props.readOnly) {
    //   this.cm.setOption('readOnly', nextProps.readOnly);
    // }
    // if (nextProps.lineNumbers !== this.props.lineNumbers) {
    //   this.cm.setOption('lineNumbers', nextProps.lineNumbers);
    // }
    // if (nextProps.lineWrapping !== this.props.lineWrapping) {
    //   this.cm.setOption('lineWrapping', nextProps.lineWrapping);
    // }
    // if (nextProps.foldGutter !== this.props.foldGutter) {
    //   this.cm.setOption('foldGutter', nextProps.foldGutter);
    // }
    // this.cm.setOption('searchKeymap', {
    //   createPanel: true,
    //   openSearchPanel: 'Mod-b'
    // });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    // const node = this.node!;
    // node.removeChild(node.children[0]);
    // this.cm = null;

  }

  getRef: React.RefCallback<HTMLDivElement> = (node) => {
    this.node = node;
  };

  render() {

    return <EditorContainer id={"editor"} ref={this.getRef} theme={this.props.theme} />;
  }

  static propTypes = {
    value: PropTypes.string,
    mode: PropTypes.string,
    lineNumbers: PropTypes.bool,
    lineWrapping: PropTypes.bool,
    readOnly: PropTypes.bool,
    theme: PropTypes.object,
    foldGutter: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    mode: 'javascript',
    lineNumbers: true,
    lineWrapping: false,
    readOnly: true,
    foldGutter: true,
    autofocus: false,
  };
}


// const editor = (props: EditorProps) => {

//   const ref = useRef()
//   return (
//     <EditorContainer id={"editor"} ref={ref} theme={props.theme} />;
//   )
// }

// export default editor;