document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.href;
    const formData = currentUrl.split("?")[1];

    if (formData) {
        const showInfo = new URLSearchParams(window.location.search);
        const resultsElement = document.getElementById("results");

        function formatDate(isoString) {
            if (!isoString) return "N/A";
            const date = new Date(isoString);
            return isNaN(date.getTime()) ? isoString : date.toLocaleString("pt-BR", {
                dateStyle: "full",
                timeStyle: "medium"
            });
        }

        resultsElement.innerHTML = `
            <p><strong>Nome:</strong> ${showInfo.get("fname") || "N/A"}</p>
            <p><strong>Sobrenome:</strong> ${showInfo.get("lname") || "N/A"}</p>
            <p><strong>E-mail:</strong> ${showInfo.get("email") || "N/A"}</p>
            <p><strong>Celular / Telefone:</strong> ${showInfo.get("phone") || "N/A"}</p>
            <p><strong>Empresa / Organização:</strong> ${showInfo.get("organization") || "N/A"}</p>
            <p><strong>Data e Hora do Envio:</strong> ${formatDate(showInfo.get("timestamp"))}</p>
        `;
    }
});