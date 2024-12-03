// content.js

// Function to download images from the page
function downloadImages() {
  let counter = 0;
  const images = document.querySelectorAll(
    '.col-md-12.py-2.border.rounded-right > .row img[src$=".jpg"]'
  );

  images.forEach((img) => {
    let score,
      plate = "";
    const spanElement = img
      .closest(".pt-2")
      .querySelector(".badge.badge-secondary");
    if (spanElement) {
      score = img
        .closest(".pt-2")
        .querySelector(".badge.badge-secondary")
        .getAttribute("title")
        .replace(/^CL:\s*/, "")
        .trim();

      plate = img
        .closest(".pt-2")
        .querySelector(".badge.badge-secondary")
        .textContent.toLowerCase()
        .trim();
    }

    const url = img.src;

    setTimeout(() => {
      const parts = url.split("/");
      const filename = `${plate ? plate + "_" : ""}${
        score ? score + "_" : ""
      }${parts.at(-1)}`;

      // Initiate download
      chrome.runtime.sendMessage({
        action: "download",
        url,
        filename: filename.replace(/\//g, ""),
      });

      console.log(url);
      document.title = `Saving... ${--counter}`;

      if (counter === 0) {
        const paginationLinks = document.querySelectorAll(".pagination a");
        if (paginationLinks.length > 0) {
          window.location.href =
            paginationLinks[paginationLinks.length - 1].href;
        }
      }
    }, counter * 800);
    counter++;
  });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadImages") {
    downloadImages();
  }
});
