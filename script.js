document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById('members');

    fetch('./people.json')
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('p[data-ubication]').forEach(p => {
                p.addEventListener('click', () => {
                    const ubication = p.getAttribute('data-ubication');
                    displayMembers(data, ubication);
                    membersContainer.style.display = 'block';
                });
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));

    function displayMembers(members, ubication) {
        const filteredMembers = members.filter(member => member.ubication === ubication);
        membersContainer.innerHTML = `
            <button onclick="hideSection('members')">Ocultar</button>
            <h2>Miembros de ${ubication}</h2>
            <div class="members-grid"></div>
        `;
        const membersGrid = membersContainer.querySelector('.members-grid');
        if (filteredMembers.length > 0) {
            filteredMembers.forEach(member => {
                const memberElement = document.createElement('p');
                memberElement.textContent = `${member.first_name} ${member.last_name}`;
                membersGrid.appendChild(memberElement);
            });
        } else {
            membersGrid.innerHTML = `<p>No hay miembros en esta ubicación.</p>`;
        }
    }
});

function hideSection(sectionId) {
    document.getElementById(sectionId).style.display = 'none';
}
