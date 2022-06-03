Vue.component("rejected-modal", {
  template: `
    <div class="calling-modal">
      <h3 class="calling-modal__title">REJECTED</h3>
      <p>The callee rejected your call!</p>

      <div class="calling-modal__buttons">
      <button class="unavailable-modal__button-ok" @click="handleOk">OK</button>
      </div>
    </div>
  `,

  computed: {
    ...Vuex.mapState(["modal"]),
  },

  methods: {
    handleOk() {
      if (this.modal.onOk) {
        this.modal.onOk()
      }
    }
  },
});
