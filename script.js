function scan() {
  const url = document.getElementById('urlInput').value.trim();
  const output = document.getElementById('output');
  
  if (!url || !url.startsWith('http')) {
    output.textContent = "[!] Please enter a valid URL[](https://example.com)";
    return;
  }

  output.textContent = `Target: ${url}\n\n`;
  output.textContent += "Initiating reconnaissance...\n";
  setTimeout(() => { output.textContent += "[+] Use tools above with proper authorization only.\n"; }, 800);
  setTimeout(() => { output.textContent += "[+] Nmap, sqlmap, ZAP, Nikto recommended.\n"; }, 1600);
  setTimeout(() => { output.textContent += "[!] This site does NOT perform real scans from browser.\n"; }, 2400);
  setTimeout(() => { output.textContent += "Always have written permission before testing.\n"; }, 3200);
}