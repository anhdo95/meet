Vue.component("app", {
  template: `
    <video-call v-if="isCallable" />
    <dashboard v-else />
  `,

  mounted() {
  },

  computed: {
    ...Vuex.mapState({
      isCallable: "isCallable",
    }),
  },
});
