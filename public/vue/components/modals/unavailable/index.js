Vue.component("unavailable-modal", {
  template: `
    <div class="unavailable-modal">
      <h3 class="unavailable-modal__title">UNAVAILABLE</h3>
      <p>Callee is not available. Please try calling again later!</p>

      <div class="unavailable-modal__buttons">
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
