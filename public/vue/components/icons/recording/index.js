Vue.component("recording-icon", {
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    width="48" height="48"
    viewBox="0 0 48 48"
    style=" fill:#000000;"
    v-on="$listeners"
    >
      <circle cx="24" cy="24" r="22" fill="#e0e0e0"></circle>
      <circle cx="24" cy="24" r="18" fill="#fff"></circle>
      <circle cx="24" cy="24" r="11" fill="#ff1d25"></circle>
    </svg>
  `,
});
