document.getElementById("toggleButton").addEventListener("click", () => {
  chrome.storage.local.get("filterEnabled", (data) => {
    const filterEnabled = !data.filterEnabled;
    chrome.storage.local.set({ filterEnabled });
    document.getElementById("toggleButton").textContent = filterEnabled
      ? "إيقاف التصفية"
      : "تشغيل التصفية";
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: toggleFilter,
        args: [filterEnabled],
      });
    });
  });
});

function toggleFilter(filterEnabled) {
  if (filterEnabled) {
    filterMovies();
  } else {
    const movieItems = document.querySelectorAll(".movieItem");
    movieItems.forEach((movie) => {
      movie.style.display = "block";
    });
  }
}
