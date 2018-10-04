import * as _ from 'lodash'
import * as React from 'react'
import axios from 'axios'
import { Loading } from '../Loading/Loading';
import './style.scss'

const defaultState = {
    message: '',
    username: '',
    password: '',
    validSubmit: false,
    loading: false
}

export class Login extends React.Component<{ verifyAuthenticated: Function }, typeof defaultState> {
    constructor(props: any) {
        super(props)
        this.state = _.cloneDeep(defaultState)
  }

  async login(e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault()
      if (!this.state.validSubmit) {
          return this.setState({
              message: 'Please fill in your username and password'
          })
      }
      try {
          this.setState({
              loading: true
          })
          let result = await axios.post('/v1/authentication/login', {
              username: this.state.username,
              password: this.state.password
          })
          console.log(result)
          this.props.verifyAuthenticated(true, () => {
              window.location.href = '/cellar/';
          })
      } catch (e) {
          console.error(e)
          this.setState({
              loading: false,
              message: _.get(e, 'response.data.message', e.message),
          })
      }
  }

   changeField(fieldName: string, event: any) {
       this.setState({
          [fieldName]: event.target.value as string,
          message: ''
       } as any, () => {
           if (
               _.trim(this.state.username).length > 0 && _.trim(this.state.password).length > 0
           ) {
               this.setState({
                   validSubmit: true
                })
           }
       })
   }

  render() {
    return (
      <div className='login_container'>
        <div style={{margin: 'auto'}}>
            <div className='logo-container'>
                <h3>Cellar</h3>
            </div>
            <h2 style={{ marginTop: '0px' }}>Login first</h2>
                {this.state.loading ?
                (<Loading />) :
                (<form className='create-item-form-group login-form' style={{ maxWidth: '400px', textAlign: 'center', margin: 'auto' }} onSubmit={this.login.bind(this)}>
                    <input
                        className={'create-item-input'}
                        value={this.state.username}
                        onChange={this.changeField.bind(this, 'username')}
                        placeholder='Email'
                    />
                    <input
                        className={'create-item-input'}
                        type='password'
                        value={this.state.password}
                        onChange={this.changeField.bind(this, 'password')}
                        placeholder='Password'
                    />
                    <p style={{ fontSize: '11px' }}>{this.state.message}</p>
                    <input className={`create-item-form-btn ${this.state.validSubmit ? 'active-btn' : 'inactive-btn'}`} type='submit' />
                </form>)}
            </div>
      </div>
    )
  }
}
