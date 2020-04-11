import React from 'react';

export default class DisplayRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      ingredients: [],
      directions: [],
      image: '',
      author: ''
    }
  }

  componentDidMount() {

  }
}
