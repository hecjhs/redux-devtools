import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Base16Theme } from 'base16';
import { defaultStyle, themedStyle } from './styles';
import { Theme } from '../themes/default';
import { basicSetup, EditorView } from 'codemirror';
import { keymap } from "@codemirror/view"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import { search, searchKeymap } from "@codemirror/search"
import { EditorState } from "@codemirror/state";

// import doc from './data';

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
    const cmState = EditorState.create(
      {
        doc: "",
        extensions: [
          basicSetup,
          history(),
          search(),
          keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap]),
        ],
      }
    );
    this.cm = new EditorView({
      state: cmState,
      // @ts-ignore i don't know what to do
      parent: document.getElementById("editor")
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps: EditorProps) {
    // @ts-ignore ignoring this for now
    this.cm.setState(
      EditorState.create({
        doc: nextProps.value,
        extensions: [
          basicSetup,
          history(),
          search(),
          keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap]),
        ],
      })
    )
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    const node = this.node!;
    node.removeChild(node.children[0]);
    this.cm = null;
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
