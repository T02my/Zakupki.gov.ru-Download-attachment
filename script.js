//=== Variables ===

let flag, target, interval, i, attachmentText, counter, downloadBtn;

intervalValue = 7000;

chrome.storage.local.get(["intervalVal"]).then((result) => {
  if (result.intervalVal != null) {
    intervalValue = result.intervalVal;
  }
});

//=== EventListeners ===
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
  	if (key == 'intervalVal') {
  		intervalValue = newValue;
  	}
  }
});

//=== Functions ===
function downloadAttachment() {
	if (flag == 2) {
		target.children[i].children[1].children[2].click();
	} else {
		target.children[i].childNodes[1].childNodes[5].childNodes[1].click()
	}
	i++;
	if (i >= counter) {
		console.log('Все файлы скачаны.')
		clearInterval(interval);
		downloadBtn.textContent =" Файлы скачаны";
	}
}

function startDownload(event) {
	console.log(`Старт скачивания файлов. Интервал установлен: ${intervalValue / 1000} секунд`);
	downloadBtn.textContent = " Файлы скачиваются..."
	event.preventDefault();
	(target.childElementCount > 6) ? counter = target.childElementCount - 1 : counter = target.childElementCount;
	interval = setInterval(downloadAttachment, intervalValue);
	this.removeEventListener('click', startDownload);
}

function addDownloadButton(element) {
	downloadBtn = document.createElement('a');
	downloadBtn.textContent = "(Скачать все файлы)";
	downloadBtn.style="font-weight: bold;";
	downloadBtn.addEventListener('click', startDownload);
	element.textContent += "	";
	element.append(downloadBtn);
}

//=== Starts here ===
if ( window.location.href.includes('notice223/documents.html') ) { // fz 223
	attachmentText = document.querySelectorAll('.col-12');
	addDownloadButton(attachmentText[2].children[0]);
	[flag, i] = [2, 0];
	target = document.querySelectorAll('.attachment__value')[3];

} else if (window.location.href.includes('20/view/documents.html') ) { //fz 44
	attachmentText = document.querySelector('.first-row-active-documents').children[1].children[0].children[0]; // ".section__title"
	addDownloadButton(attachmentText);
	[flag, i] = [1, 1];
	target = document.querySelector('.first-row-active-documents').children[1].children[0]; //.blockFilesTabDocs'
}
