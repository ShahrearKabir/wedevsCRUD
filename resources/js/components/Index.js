// import React from 'react';
// import ReactDOM from 'react-dom';

// function Index() {
//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 <div className="col-md-8">
//                     <div className="card">
//                         <div className="card-header">Example Component</div>

//                         <div className="card-body">I'm an example component!</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Index;

// if (document.getElementById('root')) {
//     ReactDOM.render(<Index />, document.getElementById('root'));
// }


import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Main from './Router';

import '../../../node_modules/primereact/resources/themes/nova/theme.css';
import '../../../node_modules/primereact/resources/primereact.min.css';
import '../../../node_modules/primeicons/primeicons.css';

class Index extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route component={Main} />
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<Index/>, document.getElementById('root'));