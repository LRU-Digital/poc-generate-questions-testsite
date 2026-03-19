declare namespace JSX {
  interface IntrinsicElements {
    'teacher-tool-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'chat-api'?: string;
      'size'?: string;
      'open'?: boolean;
      'chat-assistant-id'?: string;
    };
  }
}