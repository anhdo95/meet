Vue.component("dashboard", {
  template: `
    <div class="dashboard">
      <h1 class="dashboard__logo">
        M<span class="dashboard__highlight">ee</span>t
      </h1>

      <div class="dashboard__your-code-container">
        <input class="dashboard__your-code" />
        <copy-icon class="dashboard__copy-icon" />
      </div>
    </div>
  `,
});
