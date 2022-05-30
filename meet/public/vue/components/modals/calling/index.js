Vue.component("calling-modal", {
  template: `
    <div class="calling-modal">
      <h3 class="calling-modal__title">CALLING</h3>
      <p>Calling your friend!</p>

      <div class="calling-modal__buttons">
        <button class="calling-modal__button-reject" @click="handleReject">Reject</button>
      </div>
    </div>
  `,

  computed: {
    ...Vuex.mapState(["modal"]),
  },

  methods: {
    handleReject() {
      if (this.modal.onReject) {
        this.modal.onReject();
      }
    }
  },
});
