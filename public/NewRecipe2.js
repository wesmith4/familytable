'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var domContainer = document.querySelector('#new-recipe-form');

var NewRecipe2 = function (_React$Component) {
  _inherits(NewRecipe2, _React$Component);

  function NewRecipe2() {
    _classCallCheck(this, NewRecipe2);

    var _this = _possibleConstructorReturn(this, (NewRecipe2.__proto__ || Object.getPrototypeOf(NewRecipe2)).call(this));

    _this.handleInputChange = function (event) {
      if (['ingredient', 'quantity'].includes(event.target.name)) {
        var ingredients = [].concat(_toConsumableArray(_this.state.ingredients));
        ingredients[event.target.dataset.id][event.target.name] = event.target.value;
        _this.setState({ ingredients: ingredients });
      } else if (event.target.name === 'action') {
        var directions = [].concat(_toConsumableArray(_this.state.directions));
        directions[event.target.dataset.id][event.target.name] = event.target.value;
        _this.setState({ directions: directions });
      } else {
        _this.setState(_defineProperty({}, event.target.name, event.target.value));
      }
    };

    _this.onSubmit = function (event) {
      event.preventDefault();
      fetch('/newRecipe', {
        method: 'POST',
        body: JSON.stringify(_this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(ReactDOM.unmountComponentAtNode(domContainer));
    };

    _this.addStep = function (event) {
      _this.setState(function (prevState) {
        return {
          directions: [].concat(_toConsumableArray(prevState.directions), [{ action: '' }])
        };
      });
    };

    _this.addIngredient = function (event) {
      _this.setState(function (prevState) {
        return {
          ingredients: [].concat(_toConsumableArray(prevState.ingredients), [{ ingredient: '', quantity: '' }])
        };
      });
    };

    _this.removeIngredient = function (i) {
      var ingredients = _this.state.ingredients;
      ingredients.splice(i, 1);
      _this.setState({ ingredients: ingredients });
    };

    _this.removeStep = function (i) {
      var steps = _this.state.directions;
      steps.splice(i, 1);
      _this.setState({ directions: steps });
    };

    _this.state = {
      title: '',
      creatorName: '',
      ingredients: [{ ingredient: '', quantity: '' }, { ingredient: '', quantity: '' }, { ingredient: '', quantity: '' }],
      directions: [{ action: '' }, { action: '' }, { action: '' }],
      notes: ''
    };
    return _this;
  }

  _createClass(NewRecipe2, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.history.push('/');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'container-fluid' },
        React.createElement(
          'form',
          { onSubmit: this.onSubmit.bind(this) },
          React.createElement('i', { 'class': 'fas fa-apple-alt' }),
          React.createElement(
            'h1',
            null,
            'Add a recipe:'
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title', value: this.state.title, onChange: this.handleInputChange, required: true })
          ),
          React.createElement(
            'div',
            { 'class': 'form-group' },
            React.createElement('input', { type: 'text', name: 'creatorName', placeholder: 'Creator', value: this.state.creatorName, onChange: this.handleInputChange, required: true })
          ),
          React.createElement(
            'div',
            { 'class': 'form-group' },
            React.createElement(
              'h4',
              null,
              'Ingredients'
            ),
            React.createElement(
              'ul',
              { className: 'form-input-list' },
              this.state.ingredients.map(function (val, idx) {
                return React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                      'div',
                      { 'class': 'form-row' },
                      React.createElement(
                        'div',
                        { className: 'col-5' },
                        React.createElement('input', {
                          type: 'text',
                          name: 'ingredient',
                          'data-id': idx,
                          value: _this2.state.ingredients[idx].ingredient,
                          onChange: _this2.handleInputChange,
                          className: 'ingredient',
                          placeholder: 'Ingredient' })
                      ),
                      React.createElement(
                        'div',
                        { className: 'col-5' },
                        React.createElement('input', {
                          type: 'text',
                          name: 'quantity',
                          'data-id': idx,
                          value: _this2.state.ingredients[idx].quantity,
                          onChange: _this2.handleInputChange,
                          className: 'quantity',
                          placeholder: 'Quantity' })
                      ),
                      React.createElement(
                        'div',
                        { className: 'col-2' },
                        React.createElement(
                          'button',
                          { className: 'btn btn-secondary', onClick: function onClick() {
                              return _this2.removeIngredient(idx);
                            } },
                          'Remove'
                        )
                      )
                    )
                  )
                );
              })
            ),
            React.createElement(
              'button',
              { className: 'btn btn-secondary', onClick: this.addIngredient },
              'Add Ingredient'
            )
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
              'h4',
              null,
              'Directions'
            ),
            React.createElement(
              'ol',
              { className: 'form-input-list' },
              this.state.directions.map(function (val, idx) {
                return React.createElement(
                  'div',
                  { className: 'form-group' },
                  React.createElement(
                    'li',
                    null,
                    React.createElement(
                      'div',
                      { className: 'form-row' },
                      React.createElement(
                        'div',
                        { className: 'col-10' },
                        React.createElement('textarea', { cols: '50', rows: '2'
                          /* <input type="text" */
                          , name: 'action',
                          id: '',
                          'data-id': idx,
                          value: _this2.state.directions[idx].action,
                          onChange: _this2.handleInputChange,
                          className: 'action',
                          placeholder: 'Step' })
                      ),
                      React.createElement(
                        'div',
                        { className: 'col-2' },
                        React.createElement(
                          'button',
                          { className: 'btn btn-secondary', onClick: function onClick() {
                              return _this2.removeStep(idx);
                            } },
                          'Remove'
                        )
                      )
                    )
                  )
                );
              })
            ),
            React.createElement(
              'button',
              { className: 'btn btn-secondary', onClick: this.addStep },
              'Add Step'
            )
          ),
          React.createElement(
            'div',
            { className: 'form-group form-input-list' },
            React.createElement('textarea', { name: 'notes', placeholder: 'Notes', value: this.state.notes, onChange: this.handleInputChange })
          ),
          React.createElement(
            'button',
            { type: 'submit', className: 'btn btn-primary' },
            'Submit'
          )
        )
      );
    }
  }]);

  return NewRecipe2;
}(React.Component);

ReactDOM.render(React.createElement(NewRecipe2, null), domContainer);