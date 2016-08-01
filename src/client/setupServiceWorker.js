if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./swcore.js', {scope: './'}).then(function (reg) {
    // Registration was successful. Now, check to see whether the service worker is controlling the page.
    console.log(".serviceWorker.register")
    console.log(reg);
  }).catch(function (error) {
    console.log(".serviceWorker.register.controller ERROR:")
    console.log(error)
  });
} else {
  console.log(".serviceWorker.register NOT SUPPORTED")
}
