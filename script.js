async function startScan() {
  const target = document.getElementById('target').value.trim();
  const resultsDiv = document.getElementById('results');
  if (!target || !target.startsWith('http')) return alert("Enter valid URL");

  resultsDiv.style.display = 'block';
  resultsDiv.innerHTML = `<div class="result-item">Target locked: ${target}</div>`;
  
  const domain = new URL(target).hostname;

  // 1. Whois
  addResult(`WHOIS Lookup`);
  await fetch(`https://api.whoisfreaks.com/v1.0/whois?apiKey=free&domainName=${domain}`)
    .then(r => r.json()).then(d => addResult(d.whois?.current_registrar || "No WHOIS data"));

  // 2. DNS Records
  addResult(`DNS Records`);
  await fetch(`https://api.hackertarget.com/dnslookup/?q=${domain}`)
    .then(r => r.text()).then(d => addResult(d.substring(0, 800) + (d.length > 800 ? "\n..." : "")));

  // 3. HTTP Headers + Tech Stack
  addResult(`Technologies & Headers`);
  await fetch(`https://api.wappalyzer.com/v2/lookup/?urls=${target}&api_key=free`)
    .then(r => r.json()).then(d => {
      const tech = d[0]?.technologies?.map(t => t.name).join(', ') || "Undetected";
      addResult(`Detected: ${tech}`);
    });

  // 4. SSL/TLS Info
  addResult(`SSL Certificate`);
  await fetch(`https://api.ssllabs.com/api/v3/analyze?host=${domain}`)
    .then(r => r.json()).then(d => addResult(`Grade: ${d.grade || "Analyzing..."}`));

  // 5. Subdomains (top 100)
  addResult(`Subdomains Discovery`);
  await fetch(`https://api.hackertarget.com/hostsearch/?q=${domain}`)
    .then(r => r.text()).then(d => addResult(d.substring(0, 1000)));

  // 6. Port Scan (basic)
  addResult(`Open Ports (Top 100)`);
  await fetch(`https://api.hackertarget.com/nmap/?q=${domain}`)
    .then(r => r.text()).then(d => addResult(d));

  addResult(`Scan completed by L8ab's Tools | Use only with permission`);
}

function addResult(text) {
  const div = document.createElement('div');
  div.className = 'result-item';
  div.textContent = text;
  document.getElementById('results').appendChild(div);
}
