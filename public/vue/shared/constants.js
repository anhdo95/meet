const constants = {
  CALL_STATE: {
    UNAVAILABLE: 'UNAVAILABLE',
    AVAILABLE: 'AVAILABLE',
  },
  
  PRE_OFFER_ANSWER: {
    CALLEE_NOT_FOUND: "CALLEE_NOT_FOUND",
    CALLEE_FOUND: "CALLEE_FOUND",
    CALLEE_ACCEPTED: "CALLEE_ACCEPTED",
    CALLEE_REJECTED: "CALLEE_REJECTED",
    CALLEE_UNAVAILABLE: "CALLEE_UNAVAILABLE",
  },

  SIGNALING: {
    OFFER: 'OFFER',
    ANSWER: 'ANSWER',
    CANDIDATE: 'CANDIDATE',
  },
  
  MODAL_TYPE: {
    NOT_FOUND: "not-found-modal",
    UNAVAILABLE: "unavailable-modal",
    REJECTED: "rejected-modal",
    PERMISSION: "permission-modal",
    CALLING: "calling-modal",
    INCOMING_CALL: "incoming-call-modal",
  }
};
