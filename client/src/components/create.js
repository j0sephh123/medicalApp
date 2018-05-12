import React, {Component} from 'react';
import {inputClassNameFn} from '../helper';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Create extends Component {
  state = {
    drugName: '',
    errors: null,
    redirectToReferrer: false,
    groups: [],
    selectedGroup: 'ARBs',
    loadingBar: {
      width: 0
    }
  }

  componentDidMount() {
    axios({method: 'get', url: '/groups'}).then(response => {
      this.setState(() => ({
        groups: [...response.data.groups]
      }))
    }).catch(err => console.log(err));
  } // load groups into the local state

  onChange = (e) => {
    let data = e.target.name;
    let value = e.target.value.trim();
    
    this.setState(() => ({[data]: value}));
  } // input change

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.drugName.length <= 4 || this.state.drugName.length >= 15) {
      this.setState(() => ({errors: 'invalidLength'}));
      return;
    }
    this.setState(() => ({errors: 'empty', redirectToReferrer: true}));

    const selectedGroupID = this.state.groups.filter(groupName => (
      groupName.name === this.state.selectedGroup
    ))[0]._id;

    axios({
      method: 'post',
      url: '/drugs/',
      data: {
        name: this.state.drugName,
        groupId: selectedGroupID
      }
    })
      .then(result => console.log(result))
      // .catch(err => console.log(err));

    return;
  } // on form submit

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to='/'/>
    } // redirect

    if (this.state.groups.length === 0) {
      return (
        <h1 className='text-center'>Loading...</h1>
      )
    } // display loading...

    let inputClassName = inputClassNameFn(this.state.errors);
    

    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <fieldset className='container text-center w-50 border'>
            <legend>Create a Drug</legend>
            <div className='form-group'>
              <input
                className={inputClassName.className}
                type='text'
                name='drugName'
                onChange={this.onChange}
                value={this.state.drugName}
                placeholder="placeholder"/> 
              {inputClassName.message}
            </div>

            <div>
              <select 
                name='selectedGroup' 
                value={this.state.selectedGroup} 
                onChange={(e) => this.onChange(e)} >
                {this.state.groups.length > 0 ? 
                  this.state.groups.map(gr => (<option key={gr._id}>{gr.name}</option>))
                  : null
                }
              </select>
            </div>
            <div>
              <button>Click</button>
            </div>
          </fieldset>
        </form>
      </React.Fragment>
    );
  }
}

export default Create;
