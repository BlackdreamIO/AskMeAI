import MarkdownIt from 'markdown-it';
import Prism from 'prismjs';
//import { Highlight, themes } from 'prism-react-renderer';
import 'prismjs/themes/prism-okaidia.css'; // Import a Prism theme with improved appearance
//import 'highlight.js/styles/github.css'; // Import a style for highlight.js
//import hljs from 'highlight.js/lib/core'; // Import only the core functionality of highlight.js

import 'prismjs/components/prism-python'; // Include additional languages as needed
import 'prismjs/components/prism-javascript'; // Include additional languages as needed
import 'prismjs/components/prism-csharp'; // Include additional languages as needed
import 'prismjs/components/prism-java'; // Include additional languages as needed
//import 'prismjs/components/prism-cpp'; // Include additional languages as needed

// Initialize MarkdownIt
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && Prism.languages[lang]) {
      return Prism.highlight(str, Prism.languages[lang], lang);
    }
    return ''; // use external default escaping
  }
});

const CustomMarkdown = ({ content } : { content : any }) => {
  // Render the Markdown content with MarkdownIt
  const renderedContent = md.render(content);

  /*
  // A function to render code blocks using prism-react-renderer
  const renderCodeBlock = (code : string, language : any) => (
    <Highlight
      theme={themes.okaidia}
      code={code.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px', overflowX: 'auto' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
  */

  // Render the replaced content
  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
};

export default CustomMarkdown;
