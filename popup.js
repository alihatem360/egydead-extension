const button = document.getElementById("toggleFilter");

chrome.storage.local.get("filterEnabled", ({ filterEnabled }) => {
  button.textContent = filterEnabled ? "إيقاف الفلترة" : "تشغيل الفلترة";
  button.style.backgroundColor = filterEnabled ? "red" : "green";
});

button.addEventListener("click", () => {
  chrome.storage.local.get("filterEnabled", ({ filterEnabled }) => {
    const newState = !filterEnabled;
    chrome.storage.local.set({ filterEnabled: newState });
    button.textContent = newState ? "إيقاف الفلترة" : "تشغيل الفلترة";
    button.style.backgroundColor = newState ? "red" : "green";

    // التأكد من وجود tab مفتوح ومطابق للرابط
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (
        tabs[0]?.url?.includes(
          "egydeadw.sbs/category/%D8%A7%D9%81%D9%84%D8%A7%D9%85-%D9%83%D8%B1%D8%AA%D9%88%D9%86",
          "egydeadw.sbs/category/%d8%a7%d9%81%d9%84%d8%a7%d9%85-%d9%83%d8%b1%d8%aa%d9%88%d9%86/"
        )
      ) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "toggleFilter",
          enabled: newState,
        });

        // إعادة تحميل الصفحة بعد تغيير الحالة
        chrome.tabs.reload(tabs[0].id);
      } else {
        console.log("الصفحة الحالية مش مطابقة للـ URL المحدد");
      }
    });
  });
});
