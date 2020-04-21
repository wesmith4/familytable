import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class UserBar extends React.Component{

  render(){
    let tagName = null;
    if (this.props.user) {
      tagName = this.props.user.fullName;
    }
    return(
      <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-danger">
        <a className="navbar-brand" href="/"><i class="fas fa-user"></i></a>
        <h4>{tagName}</h4>

        <h1 className="text-lg-center">My Family Table</h1>


        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#userLinks" aria-controls="userLinks" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="userLinks">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"><a className="nav-link" href="/">Recipes</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Memories</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Photos</a></li>
          </ul>
        </div>
       </nav>
    )
  }
}

export default UserBar
