import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/hello.jsx';
// import { add } from './e';

// console.log(add(3, 3));
// console.log(sub(4, 2));
// console.log(foo);


// class App extends React.Component {
//   render() {
//     return (
//       <h1>Hello</h1>
//     );
//   }
// }


ReactDOM.render(<Hello />, document.getElementById('app'));
