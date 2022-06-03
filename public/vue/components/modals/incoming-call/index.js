Vue.component("incoming-call-modal", {
  template: `
    <div class="incoming-call-modal">
      <h3 class="incoming-call-modal__title">INCOMING CALL</h3>
      <p>There is an incoming call to you!</p>

      <div class="incoming-call-modal__buttons">
        <button class="incoming-call-modal__button-approve" @click="handleApprove">Approve</button>
        <button class="incoming-call-modal__button-reject" @click="handleReject">Reject</button>
      </div>
    </div>
  `,

  computed: {
    ...Vuex.mapState(["modal"]),
  },

  methods: {
    handleApprove() {
      if (this.modal.onApprove) {
        this.modal.onApprove();
      }
    },

    handleReject() {
      if (this.modal.onReject) {
        this.modal.onReject();
      }
    }
  },
});
