Vue.component("app", {
  template: `
    <video-call v-if="isCallable" />
    <dashboard v-else />
  `,

  created() {
    wss.init()

    wss.onConnect(() => {
      this.setPersonalCode(wss.socket.id);
    })
  },

  computed: {
    ...Vuex.mapState({
      isCallable: "isCallable",
    }),
  },

  methods: {
    ...Vuex.mapMutations(['setPersonalCode'])
  },
});
