Vue.component("camera-off-icon", {
  template: `
    <svg width="256" height="256" viewBox="0 0 256 256" xml:space="preserve" v-on="$listeners">
      <g transform="translate(128 128) scale(0.72 0.72)" style="">
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;" transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
        <path d="M 86.659 90 c -0.771 0 -1.543 -0.296 -2.13 -0.888 l -83.318 -84 C 0.044 3.937 0.052 2.037 1.228 0.87 s 3.076 -1.159 4.243 0.017 l 83.318 84 c 1.167 1.176 1.159 3.075 -0.018 4.242 C 88.187 89.71 87.423 90 86.659 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <ellipse cx="74.479" cy="29.724999999999998" rx="3.159" ry="3.185" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) "/>
        <path d="M 74.137 77.375 H 11.363 C 5.098 77.375 0 72.247 0 65.943 V 27.255 c 0 -6.303 5.098 -11.432 11.363 -11.432 h 4.552 c 0.553 0 1.097 -0.097 1.617 -0.287 c 1.555 -0.572 3.279 0.231 3.848 1.787 c 0.569 1.556 -0.231 3.279 -1.787 3.848 c -1.183 0.433 -2.42 0.652 -3.678 0.652 h -4.552 C 8.406 21.823 6 24.26 6 27.255 v 38.688 c 0 2.995 2.406 5.432 5.363 5.432 h 62.773 c 1.657 0 3 1.343 3 3 S 75.794 77.375 74.137 77.375 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 45 67.054 c -12.075 0 -21.899 -9.894 -21.899 -22.054 c 0 -5.886 2.275 -11.421 6.406 -15.586 c 1.167 -1.176 3.065 -1.185 4.243 -0.017 c 1.176 1.167 1.184 3.066 0.017 4.243 c -3.009 3.033 -4.666 7.068 -4.666 11.36 c 0 8.853 7.132 16.054 15.899 16.054 c 4.242 0 8.231 -1.667 11.233 -4.693 c 1.166 -1.178 3.066 -1.184 4.242 -0.018 c 1.177 1.167 1.185 3.066 0.018 4.242 C 56.356 64.757 50.854 67.054 45 67.054 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 85.412 73.884 c -0.605 0 -1.217 -0.183 -1.747 -0.563 c -1.346 -0.966 -1.653 -2.841 -0.687 -4.187 C 83.646 68.203 84 67.1 84 65.943 V 27.255 c 0 -2.995 -2.406 -5.432 -5.363 -5.432 h -4.552 c -3.983 0 -7.622 -2.196 -9.496 -5.732 L 63.214 13.5 c -1.175 -2.216 -3.447 -3.592 -5.933 -3.592 H 32.719 c -1.958 0 -3.815 0.86 -5.095 2.359 c -1.076 1.26 -2.968 1.41 -4.229 0.334 c -1.26 -1.076 -1.41 -2.969 -0.334 -4.229 c 2.421 -2.837 5.942 -4.464 9.659 -4.464 h 24.563 c 4.712 0 9.017 2.599 11.233 6.782 l 1.375 2.591 c 0.831 1.568 2.438 2.542 4.195 2.542 h 4.552 C 84.902 15.823 90 20.952 90 27.255 v 38.688 c 0 2.42 -0.743 4.733 -2.148 6.69 C 87.266 73.449 86.346 73.884 85.412 73.884 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        <path d="M 63.555 51.657 c -0.188 0 -0.378 -0.019 -0.569 -0.055 c -1.627 -0.313 -2.692 -1.886 -2.38 -3.513 c 0.195 -1.014 0.294 -2.054 0.294 -3.09 c 0 -8.852 -7.133 -16.054 -15.899 -16.054 c -1.071 0 -2.14 0.107 -3.176 0.32 c -1.623 0.334 -3.208 -0.714 -3.541 -2.337 c -0.333 -1.624 0.714 -3.208 2.337 -3.541 c 1.432 -0.293 2.905 -0.442 4.38 -0.442 c 12.075 0 21.899 9.893 21.899 22.054 c 0 1.416 -0.135 2.837 -0.401 4.223 C 66.222 50.658 64.965 51.656 63.555 51.657 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
      </g>
      </g>
    </svg>
  `,
});
