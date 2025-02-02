function filterMovies() {
  const movieItems = document.querySelectorAll(".movieItem");

  movieItems.forEach((movie) => {
    const title = movie.querySelector("h1.BottomTitle")?.textContent || "";
    movie.style.display = title.includes("مدبلج") ? "block" : "none";
  });
}

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

// تشغيل الفلترة عند تحميل الصفحة
window.addEventListener("load", () => {
  chrome.storage.local.get("filterEnabled", (data) => {
    if (data.filterEnabled) {
      filterMovies();
    }
  });
});

// مراقبة أي تحديثات في الصفحة
const observer = new MutationObserver(() => {
  chrome.storage.local.get("filterEnabled", (data) => {
    if (data.filterEnabled) {
      filterMovies();
    }
  });
});
observer.observe(document.body, { childList: true, subtree: true });
