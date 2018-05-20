import { combineReducers } from 'redux';
import cardsById from './cardsById';
import boardsById from './boardsById';
import currentBoardId from './currentBoardId';
import listsById from './listsById';

export default combineReducers({
  cardsById,
  boardsById,
  currentBoardId,
  listsById
});
