/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      colors: {
        cyanccd: "#00eadf", // Sin guiones
        skyccd: "#3185f7",
        darkblueccd: "#162e54",
        nightblueccd2: "#131939",
        violetccd2: "#6232fa",
        magentaccd2: "#FF00BF",
        midnightblueccd2: "#131939",
        abyssblueccd2: "#0b1026",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('daisyui')
  ],
}