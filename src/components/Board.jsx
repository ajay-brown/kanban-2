import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import classnames from 'classnames';
import Header from 'Header';
import BoardHeader from 'BoardHeader';
import List from "List";
import ListAdder from 'ListAdder'
import './components/styles/Board.scss';

class Board extends Component {
    static propTypes = {
        lists: PropTypes.arrayOf(
            PropTypes.shape({ id: PropTypes.string.isRequired})).isRequired,
            boardId: PropTypes.string.isRequired,
            boardTitle: PropTypes.string.isRequired,
            dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            startX: null,
            startScrollX: null
        }
    }

    componentDidMount() {
        const (boardId, dispatch) = this.props;
        dispatch({
            type: "PUT_ID_TO_REDUX",
            payload: {boardId}
        })
    }

    handleDragEnd = ({source,destination, type}) => {
        if (!destination) {
            return
        }
        const {dispatch, boardId} = this.props;

        if (type === "COLUMN") {
            if (source.index !== destination.index) {
                dispatch({
                    type: "MOVE_LIST",
                    payload: {
                        oldListIndex: source.index,
                        newListIndex: destination.index,
                        boardId: source.droppableId
                    }
                })
                return;
            }
            //to move card
            if (source.index !== desination.index || source.droppableId !== destination.droppableId) {
                dispatch({
                    type: "MOVE_CARD", payload: {
                        sourceListId: source.droppableId,
                        destListId: destination.droppableId,
                        oldCardIndex: source.index,
                        newCardIndex: destination.index, boardId
                    }
                });
            }
        }
        //dragging via mouse

        handleMouseDown = ({target, clientX}) => {
         window.addEventListener('mousemove', this.handleMouseMove);
         window.addEventListener('mouseup', this.handleMouseUp);
         this.setState({ startX: clientX, startScrollX: window.scrollX})
        }
        handleMouseMove = ({clientX}) => {
            const {startX, startScrollX} = this.state;
            const scrollX = startScrollX - clientX + startX;
            window.scrollTo(scrollX, 0);
            if (scrollX !== windowScrollX) {
                this.setState({
                    startX: clientX + windowScrollX - startScrollX
                });
            }
        }

        handleMouseUp =() =>  {
            if (this.state.startX) {
                window.removeEventListener('mousemove', this.handleMouseMove);
                window.removeEventListener('mouseup', this.handleMouseUp);
                this.setState({startX: null, startScrollX: null});
            };
        };

        handleWheel = ({target, deltaY}) => {
            if (
                target.className !== "list-wrapper" &&
                target.className !== "lists" &&
                target.className !== "open-composer-button" &&
                target.className !== "list-title-button"
              ) {
                return;
              }
           
            if (Math.sign(deltaY) === 1) {
                window.scrollTo(window.scrollX + 80,0);
            } else if (Math.sign(deltaY) === -1) {
                window.scrollTo(window.scrollX - 80, 0)
            }
        }

        render() {
            const {boardTitle, boardId} = this.props;
            return (
                <React.Fragment>
                <div className=(classnames('board'))>
                <Helmet>
                <title>
                {boardTitle} | Kanban Board</title></Helmet>
                <Header />
                <BoardHeader />
                <DragDropContext onDragEnd={this.handleDragEnd}>
                <Droppable 
                droppableId={boardId}
                type="COLUMN"
                direction='horizontal'>
                {provided => (
                    <div className='lists' ref={provided.innerRef}>
                    {lists.map((list,index) => (
                        <List
                        list ={list}
                        boardId = {boardId}
                        index={index}
                        key={list.id}
                        />
                ))}
                {provided.placeholder}
                <ListAdder boardId={boardId} />
                </div>
            )}
            </Droppable>
                </DragDropContext>
               
                <div className ="board-underlay"/>
                </React.Fragment>
            )
        };

    }
}
    const mapStateToProps = (state, ownProps) => {
        const { board } = ownProps;
        return {
          lists: board.lists.map(listId => state.listsById[listId]),
          boardTitle: board.title,
          boardColor: board.color,
          boardId: board._id
        };
      };
      
      export default connect(mapStateToProps)(Board);

    
