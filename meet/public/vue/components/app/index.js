Vue.component("app", {
  template: `
    <video-call v-if="isCallable" />
    <dashboard v-else />
  `,

  created() {
    const socket = io.connect()
    socket.on('connect', () => {
      this.setPersonalCode(socket.id);
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
