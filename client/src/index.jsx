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

  componentDidMount() {
    this.getRepos();
  }

  getRepos (obj) {
    var context = this;
    $.ajax({
      url: '/repos',
      type: 'GET',
      success: (data) => {
        console.log(data.length);
        context.setState({
          repos: data
        })
      }
    });
  }

  search (term) {
    var context = this;
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: JSON.stringify({term: term}),
      contentType: 'application/json',
      success: (data) => {
        context.getRepos();
        (console.log('message sent'))
      }
    });
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