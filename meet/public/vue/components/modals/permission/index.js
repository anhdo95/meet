Vue.component("permission-modal", {
  template: `
    <div class="permission-modal">
      <h3 class="permission-modal__title">PERMISSION</h3>
      <p>Please give an access to your camera and mic on the browser!</p>

      <div class="permission-modal__buttons">
        <button class="permission-modal__button-ok" @click="handleOk">OK</button>
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
