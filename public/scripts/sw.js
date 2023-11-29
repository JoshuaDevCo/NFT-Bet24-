// Notification Service Worker Start
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    console.log("ServiceWorker Supported in Browser...");

    function subscribeUserToPush() {
      return navigator.serviceWorker
        .register("/service-worker.js")
        .then(function (registration) {
          const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              "BOjUeeT9DK-PAstFM-_1KQMBpfXIiIDrdc2nyQNW4YZMwfcrZaa5_8Z8H8hNg23XHONgZiOH9fGJ_2lofahukVc"
            ),
          };

          return registration.pushManager.subscribe(subscribeOptions);
        })
        .then(function (pushSubscription) {
          // console.log(
          //   "Received PushSubscription: ",
          //   JSON.stringify(pushSubscription)
          // );
          return pushSubscription;
        })
        .then(function (subscription) {
          return fetch("/api/front/save-subscription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sub: subscription, domain: DOMAIN }),
          })
            .then(function (response) {
              if (!response.ok) {
                throw new Error("Bad status code from server.");
              }

              return response.json();
            })
            .then(function (responseData) {
              // console.log(responseData);
            });
        });
    }

    function urlBase64ToUint8Array(base64String) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    console.log(`Notification Permission is ${Notification.permission}...`);
    // if (Notification.permission == "default") {
      subscribeUserToPush();
    // }
  });
} else {
  console.log("ServiceWorker Not Supported in Browser... ");
}
// Notification Service Worker End
