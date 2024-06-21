import * as Mutation from "../mutationTypes/visitor.mutationTypes";
const STATUS = {
  CHECKED_IN: 3,
  MARK_AS_LEFT: 5,
  MARK_COLLECTED: 4,
  NOTIFIED_HOST: 1,
  BOLO_PASSED: 1,
  BOLO_FAILED: 0,
  REMOVE_VISIT: 0,
};

export default {
  [Mutation.ADD_TO_VISITS]: (state, payload) => state.visits.push(payload),

  [Mutation.CHECK_IN_VISIT]: (state, visitId) => {
    let visitIndex = state.visits.findIndex((i) => i.id == visitId);
    state.visits[visitIndex].visitStatus = STATUS.CHECKED_IN;
    state.visits[visitIndex].boloStatus = null;
  },

  [Mutation.MARK_COLLECTED]: (state, visitId) =>
    (state.visits[state.visits.findIndex((i) => i.id == visitId)].visitStatus =
      STATUS.MARK_COLLECTED),

  [Mutation.MARK_AS_LEFT]: (state, visitId) =>
    (state.visits[state.visits.findIndex((i) => i.id == visitId)].visitStatus =
      STATUS.MARK_AS_LEFT),

  [Mutation.NOTIFIED_HOST]: (state, visitId) =>
    (state.visits[state.visits.findIndex((i) => i.id == visitId)].notifyHost =
      STATUS.NOTIFIED_HOST),

  [Mutation.BOLO_STATUS_PASSED]: (state, visitId) =>
    (state.visits[state.visits.findIndex((i) => i.id == visitId)].boloStatus =
      STATUS.BOLO_PASSED),

  [Mutation.BOLO_STATUS_FAILED]: (state, visitId) =>
    (state.visits[state.visits.findIndex((i) => i.id == visitId)].boloStatus =
      STATUS.BOLO_FAILED),

  [Mutation.REMOVE_VISIT]: (state, visitId) => {
    let visitIndex = state.visits.findIndex((i) => i.id == visitId);
    if (visitIndex >= 0)
      state.visits[visitIndex].visitStatus = STATUS.REMOVE_VISIT;
  },
};
