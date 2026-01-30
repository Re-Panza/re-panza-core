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

    // Aggiungi messaggio utente
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
                datiPlayer: typeof DB_STORICO !== 'undefined' ? DB_STORICO : "Nessun dato specifico fornito."
            })
        });

        if (!response.ok) throw new Error("Server error");

        const data = await response.json();
const testoRisposta = data.risposta;

// Prepariamo il contenitore per la risposta del Re
loadingMsg.innerHTML = `<div style="color:#ffcc00; font-weight:bold;">👑 Re Panza:</div><span id="typing-area"></span>`;
const typingArea = loadingMsg.querySelector("#typing-area");

let i = 0;
function typeWriter() {
    if (i < testoRisposta.length) {
        typingArea.innerHTML += testoRisposta.charAt(i);
        i++;
        chatContent.scrollTop = chatContent.scrollHeight; // Scroll automatico mentre scrive
        setTimeout(typeWriter, 20); // 20ms è la velocità: più basso = più veloce
    }
}

typeWriter(); // Avvia l'effetto scrittura
        
    } catch (e) {
        console.error("Errore Re Panza:", e);
        loadingMsg.innerHTML = "👑 Le pergamene sono bagnate! Controlla la connessione al regno (o la chiave API su Vercel).";
    }
    chatContent.scrollTop = chatContent.scrollHeight;
}

// --- AGGIUNTA CHIRURGICA PER IL TASTO INVIO ---
// Questo pezzo mancava nel file che mi hai mandato!
document.addEventListener('keypress', function (e) {
    const inputField = document.getElementById('ai-input');
    if (e.key === 'Enter' && document.activeElement === inputField) {
        chiediAlRe();
    }
});
