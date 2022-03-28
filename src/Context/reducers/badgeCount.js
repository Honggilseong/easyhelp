import {BADGE_SHOW, BADGE_RESET} from '../../Constants/actionTypes';

const badgeCount = (state, {type, payload}) => {
  switch (type) {
    case BADGE_SHOW:
      return {...state, badge: (state.badge = true)};
    case BADGE_RESET:
      return {...state, badge: (state.badge = null)};
    default:
      return state;
  }
};

export default badgeCount;
