function carregarProgramacao() {
    return fetch('../config/programacao.json')
        .then(response => {
            if (!response.ok) throw new Error('Falha ao buscar programacao.json: ' + response.status);
            return response.json();
        })
        .then(programacoes => {
            const container = document.getElementById('programacao-container');
            if (!container) {
                console.error("Container não encontrado!");
                return;
            }

            container.innerHTML = '';

            const colLeft = document.createElement('div');
            colLeft.className = 'programacao-col';

            const divider = document.createElement('div');
            divider.className = 'programacao-divider';

            const colRight = document.createElement('div');
            colRight.className = 'programacao-col';

            programacoes.forEach((prog, index) => {
                const item = document.createElement('div');
                item.className = 'programacao-item';

                const title = document.createElement('h3');
                title.textContent = prog.name;

                const time = document.createElement('p');
                time.textContent = prog.time;

                item.appendChild(title);
                item.appendChild(time);

                if (index < 3) {
                    colLeft.appendChild(item);
                } else {
                    colRight.appendChild(item);
                }
            });

            container.appendChild(colLeft);
            container.appendChild(divider);
            container.appendChild(colRight);
        })
        .catch(error => console.error('Erro ao carregar programação:', error));
}

carregarProgramacao();