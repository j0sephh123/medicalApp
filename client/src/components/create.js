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
    loadingBar: {width: 0}
  }

  componentDidMount(){
    axios({
      method: 'get',
      url : '/groups'
    })
      .then(response => {
        this.setState(() => ({ groups: [...response.data.groups] }))
      })
      .catch(err => console.log(err));
  }

  onChange = (e) => {
    let data = e.target.name;
    let value = e.target.value.trim();
    
    this.setState(() => ({[data]: value}));
  } // input change

  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.drugName.length <= 4 || this.state.drugName.length >= 15) {
      this.setState(() => ({
          errors: 'invalidLength'
        }
      ));
      return;
    } 
    this.setState(() => ({
      errors: 'empty',
      redirectToReferrer: true
    }));

    axios.post('/drugs', this.state.drugName)
      .then(result => console.log(result))
      .catch(err => console.log(err));
    

    return ;
  } // on form submit

  

  render() {
    if(this.state.redirectToReferrer){
      return <Redirect to='/' />
    } // redirect

    let inputClassName = inputClassNameFn(this.state.errors);

    console.log(this.state.drugs)

    return (
      <React.Fragment>
        <div className="progress">
          <div className="progress-bar" role="progressbar" style={{width: this.state.loadingBar.width}} 
            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <fieldset className='container text-center w-50'>
        
          <legend>Create a Drug</legend>
          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <input
                className={inputClassName.className}
                type='text'
                name='drugName'
                onChange={this.onChange}
                value={this.state.drugName}
                placeholder="Just a placeholder..."/>
                {inputClassName.message}
            </div>
            <div>
              <select>
                {this.state.groups.length > 0 ? 
                  this.state.groups.map(gr => (
                    <option key={gr._id}>{gr.name}</option>
                  ))
                  : null}
              </select>
            </div>
            <div>
              <button>Click</button>
            </div>
          </form>
        </fieldset>
      </React.Fragment>
    );
  }
}

export default Create;