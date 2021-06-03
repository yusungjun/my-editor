import React from 'react';

import MainContainer from './containers/MainContainer';
import DemoTemplate from './templates/DemoTemplate';

function get_query() {
  var url = document.location.href;
  var qs = url.substring(url.indexOf('?') + 1).split('&');
  for (var i = 0, result = {}; i < qs.length; i++) {
    qs[i] = qs[i].split('=');
    result[qs[i][0]] = decodeURIComponent(qs[i][1]);
  }
  return result;
}

const App = () => {

  const urlParam = get_query();

  return (
    <div>
      {/**<MyEditor />*/}
      {urlParam.demo ? 
        <DemoTemplate urlParam={urlParam} />
        :
        <MainContainer urlParam={urlParam} />
      }
    </div>

  );
}

export default App;
