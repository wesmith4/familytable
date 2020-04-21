import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class UserBar extends React.Component{

  render(){
    return(
      <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-danger">
        <a className="navbar-brand" href="/userPage"><i class="fas fa-user"></i></a>
        <h4>{this.props.user.fullName}</h4>


        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#userLinks" aria-controls="userLinks" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="userLinks">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"><a className="nav-link" href="/userPage">Recipes</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Memories</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Photos</a></li>
          </ul>
        </div>
       </nav>
    )
  }
}

export default UserBar
