import { combineReducers } from 'redux';
import cardsById from './cardsById';
import boardsById from './boardsById';
import currentBoardId from './currentBoardId';

export default combineReducers({
  cardsById,
  boardsById,
  currentBoardId
});
