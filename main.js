function switchTab(tabName) {
  const tabContents = document.querySelectorAll(".tab-content");
  const tabs = document.querySelectorAll(".tab-button");
  
  tabContents.forEach((content) => content.style.display = "none");
  tabs.forEach((tab) => tab.classList.remove("active"));
  
  document.getElementById(tabName).style.display = "block";
  document.querySelector(`button[onclick="generateQRCode('${tabName}')"]`).classList.add("active");

  hideQRCodeAndDownloadBtn(); // Hide the QR code and download button when switching tabs
}

function generateQRCode(type) {
  let qrData;
  
  switch (type) {
    case 'wifi':
      const ssid = document.getElementById("wifi-ssid").value;
      const password = document.getElementById("wifi-password").value;
      qrData = `WIFI:T:WPA;S:${ssid};P:${password};;`;
      break;
    case 'cv':
      const cvName = document.getElementById("cv-name").value;
      const cvEmail = document.getElementById("cv-email").value;
      // Generate CV related data and set qrData
      qrData = `BEGIN:VCARD\nVERSION:3.0\nFN:${cvName}\nEMAIL:${cvEmail}\nEND:VCARD`;
      break;
    case 'social':
      const platform = document.getElementById("social-platform").value;
      const username = document.getElementById("social-username").value;
      // Generate Social Media related data and set qrData
      qrData = `https://www.${platform}.com/${username}`;
      break;
    case 'website':
      const websiteUrl = document.getElementById("website-url").value;
      qrData = websiteUrl;
      break;
    default:
      break;
  }
  
  const qrCode = document.getElementById("qr-code");
  qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

  showQRCodeAndDownloadBtn(); // Show the QR code and download button after generating the QR code
}

function showQRCodeAndDownloadBtn() {
  const qrCode = document.getElementById("qr-code");
  const downloadBtn = document.getElementById("download-btn");

  qrCode.style.display = "block";
  downloadBtn.style.display = "block";
}

function hideQRCodeAndDownloadBtn() {
  const qrCode = document.getElementById("qr-code");
  const downloadBtn = document.getElementById("download-btn");

  qrCode.style.display = "none";
  downloadBtn.style.display = "none";
}

function downloadQRCode() {
  const qrCode = document.getElementById("qr-code");
  const qrCodeDataUrl = qrCode.src;

  fetch(qrCodeDataUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = "Dev-qr-code.png";
      downloadLink.click();
      URL.revokeObjectURL(url); // Release the object URL to free resources
    })
    .catch((error) => console.error('Error downloading the QR code:', error));
}
