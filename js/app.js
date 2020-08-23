// Here, we start by checking
// if the serviceWorker is supported by the current browser(as it 's still not supported by all browsers).

//     Then, we listen to the page load event to register our service worker by passing the name of our file serviceWorker.js to navigator.serviceWorker.register() as a parameter to register our worker.

try {
  if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then((reg) => console.log("service worker registered with, ", reg))
    .catch(err => console.log("sw not registered ", err))
  }
} catch {
  console.log("err")
}