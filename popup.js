let select = document.querySelector('select');
select.addEventListener('click', () => {
    chrome.storage.local.set({ 
      intervalVal: select.options[select.selectedIndex].value * 1000,
      selectIndex: select.selectedIndex
    });
});

chrome.storage.local.get(["selectIndex"]).then((result) => {
  if (result.selectIndex != null) {
    select.selectedIndex = result.selectIndex;
  }
});