Vue.component("dashboard", {
  template: `
    <div class="dashboard">
      <h1 class="dashboard__logo">
        M<span class="dashboard__highlight">ee</span>t
      </h1>

      <p class="dashboard__howto">Talk with another friend by passing your personal code to him/her</p>
      <div class="dashboard__personal">
        <p>Your personal code</p>
        <div class="dashboard__your-code-container">
          <span class="dashboard__your-code">3-k38wEOV1NVuWcSAAAF</span>
          <copy-icon class="dashboard__copy-icon" />
        </div>
      </div>

      <div class="dashboard__friend">
        <p>Your friend code</p>
        <input class="dashboard__friend-code" type="text" value="1-k38wEOV1NVuWcSAAA0" />
        <div class="dashboard__buttons">
          <button class="dashboard__video-call">
            <video-call-icon class="dashboard__video-call-icon" />
            Video Call
          </button>
        </div>
      </div>
    </div>
  `,
});
