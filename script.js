document.getElementById('form-examen').addEventListener('submit', function(e) {
    e.preventDefault();
    const examen = {
        id: Date.now(), // Identifiant unique basé sur le timestamp
        nom: document.getElementById('nom').value,
        duree: parseInt(document.getElementById('duree').value),
        description: document.getElementById('description').value,
        proprietaire: document.getElementById('proprietaire').value,
        questions: []
    };
    const examsKey = 'examens_' + examen.proprietaire;
    let exams = JSON.parse(localStorage.getItem(examsKey)) || [];

    const exists = exams.some(ex => ex.nom === examen.nom);
    if (exists) {
        alert('Un examen avec ce nom existe déjà pour ce propriétaire !');
        return;
    }

    exams.push(examen);
    localStorage.setItem(examsKey, JSON.stringify(exams));

    alert('Examen ajouté avec succès !');
    this.reset();
});

function afficherExamens() {
    const proprietaire = document.getElementById('voir_proprietaire').value;
    const examsKey = 'examens_' + proprietaire;
    const exams = JSON.parse(localStorage.getItem(examsKey)) || [];
    const listeExamens = document.getElementById('liste-examens');

    if (exams.length === 0) {
        listeExamens.innerHTML = '<p>Aucun examen trouvé pour ce propriétaire.</p>';
        return;
    }

    let html = '<ul>';
    exams.forEach((examen, index) => {
        html += `<li>Examen ${index + 1}: ${examen.nom} (Durée: ${examen.duree} minutes) - Description: ${examen.description}</li>`;
    });
    html += '</ul>';
    listeExamens.innerHTML = html;
}