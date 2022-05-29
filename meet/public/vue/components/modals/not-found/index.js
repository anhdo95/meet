Vue.component("not-found-modal", {
  template: `
    <div class="not-found-modal">
      <h3 class="not-found-modal__title">NOT FOUND</h3>
      <p>Callee not found. Please check your friend code again!</p>

      <div class="not-found-modal__buttons">
        <button class="not-found-modal__button-ok" @click="handleOk">OK</button>
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
