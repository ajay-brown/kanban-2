import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import Header from './components/Header';
import BoardAdder from './components/BoardAdder';
import './components/styles/App.scss';
import slugify from 'slugify';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  static propTypes = {
    boards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    listsById: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  render() {
    const { boards, history, listsById } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title> Kanban Board</title>
        </Helmet>

        <Header />

        <div className="App">
          <div className="main">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Your Kanban Boards</h1>
            <div className="boards">
              {boards.map(board => (
                <Link
                  key={board.id}
                  className={classnames('board-link', board.color)}
                  to={`/b/${board.id}/${slugify(board.title, { lower: true })}`}
                >
                  <div className="board-title">{board.title}</div>
                  <div className="show-boards">
                    {board.lists.map(listId => (
                      <div
                        key={listId}
                        className="list"
                        style={{
                          height: `${Math.min(
                            (listsById[listId].cards.length + 1) * 18,
                            100
                          )}%`
                        }}
                      />
                    ))}
                  </div>
                </Link>
              ))}
              <BoardAdder history={history} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  boards: Object.values(state.boardsById),
  listsById: state.listsById
});

export default connect(mapStateToProps)(App);
