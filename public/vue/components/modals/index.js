Vue.component("modals", {
  template: `
    <div v-if="modal.type" class="modals">
      <div class="modals__container">
        <component :is="modal.type"></component>
      </div>
    </div>
  `,

  computed: {
    ...Vuex.mapState(["modal"]),
  },
});
