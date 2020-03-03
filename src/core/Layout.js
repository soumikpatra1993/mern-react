import React, { Fragment } from 'react'
import {isAuth, signout} from '../auth/helpers'
import {Link, withRouter} from 'react-router-dom'


 const Layout = ({children , match,history}) => {
    const isActive = path => {
        if (match.path === path) {
            return { color: '#000' };
        } else {
            return { color: '#fff' };
        }
    };
     const nav = () => (
         <ul className = "nav nav-tabs bg-primary">
             <li className = "nav-item">
                 <Link to = "/" className = "nav-link" style={isActive('/')}>
                    home
                </Link>
             </li>
             {!isAuth() && (
                <Fragment>
                    <li className="nav-item">
                        <Link to="/signin" className="nav-link" style={isActive('/signin')}>
                            Signin
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link" style={isActive('/signup')}>
                            Signup
                        </Link>
                    </li>
                </Fragment>
            )}  
                {isAuth() && isAuth().role === 'admin' && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/admin')} to="/admin">
                        {isAuth().name}
                    </Link>
                </li>
            )}

            {isAuth() && isAuth().role === 'subscriber' && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/private')} to="/private">
                        {isAuth().name}
                    </Link>
                </li>
            )}
            {isAuth() && (
                     <li className="nav-item">
                        <span className = "nav-link" onClick = {() => {
                            signout(()=>{
                                history.push('/')
                            })
                        }}>Sign out</span>
                    </li>
            )}
         </ul>
     )
    return (
      <Fragment>
          {nav()}
          <div className = "container">
            {children}
          </div>
      </Fragment>
    )
}
export default withRouter(Layout);
