// RE PANZA CORE - Versione Universale
const VERCEL_SERVER_URL = "https://re-panza-brain.vercel.app/api";

function toggleAI() {
    const win = document.getElementById('ai-window');
    if (win) {
        win.style.display = win.style.display === 'block' ? 'none' : 'block';
    }
}

async function chiediAlRe() {
    const inputField = document.getElementById('ai-input');
    const question = inputField.value.trim();
    const chatContent = document.getElementById('ai-content');
    
    if (!question) return;

    chatContent.innerHTML += `<div style="color:#ffcc00; margin-top:10px; font-weight:bold;">👉 Voi:</div><div style="margin-bottom:10px;">${question}</div>`;
    
    const loadingMsg = document.createElement("div");
    loadingMsg.style.fontStyle = "italic";
    loadingMsg.style.color = "#aaa";
    loadingMsg.innerHTML = "👑 Il Re sta riflettendo...";
    chatContent.appendChild(loadingMsg);
    
    inputField.value = ""; 
    chatContent.scrollTop = chatContent.scrollHeight;

    try {
        const response = await fetch(VERCEL_SERVER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: question,
                // Questo recupera i dati del player se la pagina li sta visualizzando
                datiPlayer: typeof DB_STORICO !== 'undefined' ? DB_STORICO : "Nessun dato specifico fornito."
            })
        });

        const data = await response.json();
        loadingMsg.innerHTML = `<div style="color:#ffcc00; font-weight:bold;">👑 Re Panza:</div>${data.risposta}`;
        
    } catch (e) {
        loadingMsg.innerHTML = "👑 Le pergamene sono bagnate! Controlla la connessione al regno.";
    }
    chatContent.scrollTop = chatContent.scrollHeight;
}
