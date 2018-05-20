import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './components/styles/BoardTitle.scss';

class BoardTitle extends Component {
  static propTypes = {
    boardTitle: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newTitle: props.boardTitle
    };
  }

  handleClick = () => {
    this.setState({ isOpen: true });
  };

  handleChange(e) {
    this.setState({ newTitle: event.target.value });
  }

  submitTitle = () => {
    const { dispatch, boardId, boardTitle } = this.props;
    const { newTitle } = this.state;
    if (boardTitle !== newTitle) {
      dispatch({
        type: 'CHANGE_BOARD-TITLE',
        payload: {
          boardTitle: newTitle,
          boardId
        }
      });
    }
    this.setState({ isOpen: false });
  };

  revertTitle = () => {
    const { boardTitle } = this.props;
    this.setState({ newTitle: boardTitle, isOpen: false });
  };

  handleKeyDown(e) {
      if (e.keyCode ===13) {
          this.submitTitle();

      } else (e.keyCode===27) {
          this.revertTitle()
      }
  };
  handleFocus(e) {
      e.target.select();
  };

  render() {
      const {isOpen, newTitle} = this.state;
      const {boardTitle} = this.props;
      return isOpen ? (
          <input
          autoFocus
          value={newTitle}
          type='text'
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onBlur={this.revertTitle}
          onFocus={this.handleFocus}
          className='board-title-input'
          />
      ) : (
          <button className="board-title-button" onClick={this.handleClick}>
          <h1 className='board-title-text'>{boardTitle}</h1>
          </button>

      );
    }
}

      const mapStateToProps = (state, ownProps) => {
          const {boardId} =ownProps.match.params;
          return {
              boardTitle: state.boardsById[boardId].title, boardId};
              
          
      }
      export default withRouter(connect(mapStateToProps)(BoardTitle))
  

