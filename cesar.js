function processCesar() {
    // Récupération des valeurs
    const message = document.getElementById('message').value;
    const shift = parseInt(document.getElementById('shift').value) || 3;
    const operation = document.getElementById('operation').value;
    const resultElement = document.getElementById('result');

    // Validation
    if (!message) {
        resultElement.textContent = "Veuillez entrer un message";
        return;
    }

    // Traitement
    let result;
    if (operation === 'encrypt') {
        result = cesarEncrypt(message, shift);
        resultElement.innerHTML = `<strong>Texte chiffré :</strong> ${result}`;
    } else {
        result = cesarDecrypt(message, shift);
        resultElement.innerHTML = `<strong>Texte déchiffré :</strong> ${result}`;
    }
}

function cesarEncrypt(text, shift) {
    shift = shift % 26;
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        const code = text.charCodeAt(i);

        // Majuscules (A-Z)
        if (code >= 65 && code <= 90) {
            char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
        // Minuscules (a-z)
        else if (code >= 97 && code <= 122) {
            char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        // Conserve les autres caractères
        result += char;
    }

    return result;
}

function cesarDecrypt(text, shift) {
    return cesarEncrypt(text, (26 - shift) % 26);
}

// Permet d'exécuter avec la touche Entrée
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('message').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            processCesar();
        }
    });
});