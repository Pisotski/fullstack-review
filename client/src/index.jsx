import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.getRepos = this.getRepos.bind(this);
  }

  getRepos () {
    var context = this;
    $.ajax({
      url: '/repos',
      type: 'GET',
      success: (data) => {
        context.setState({
          repos: data
        })
      }
    });
  }

  search (term) {
    var rdata = {term: term};
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: JSON.stringify({term: term}),
      contentType: 'application/json',
      success: (data) => {
        (console.log('message sent', data))
      }
    });
  this.getRepos();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));