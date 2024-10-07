document.addEventListener("DOMContentLoaded", function() {
    const yearInput = document.getElementById('year');
    const calendarDiv = document.getElementById('calendar');
    const feriadosList = document.getElementById('feriados');
    const fasesLuaList = document.getElementById('fases-lua');
    const monthTitle = document.getElementById('monthTitle');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');

    let currentMonth = new Date().getMonth(); // Mês atual (0 a 11)
    let currentYear = parseInt(yearInput.value);

    const feriadosBrasil = {
        "01-01": "Confraternização Universal",
        "02-02": "Dia de Nossa Senhora dos Navegantes",
        "21-04": "Tiradentes",
        "01-05": "Dia do Trabalhador",
        "30-05": " Corpus-Christi",
        "07-09": "Independência do Brasil",
        "20-09": "Revolução Farroupilha",
        "12-10": "Nossa Senhora Aparecida",
        "02-11": "Finados",
        "15-11": "Proclamação da República",
        "25-12": "Natal"
    };

    // Mapear fases da lua para ícones (ajustado para Janeiro como exemplo)
    const moonPhases = {        
        "04-08": { name: "Lua Crescente", icon: "lua-crescente.png" },
        "12-08": { name: "Lua Cheia", icon: "lua-cheia.png" },
        "19-08": { name: "Lua Minguante", icon: "lua-minguante.png" },
        "26-08": { name: "Lua Nova", icon: "lua-nova.png" },
        "02-09": { name: "Lua Crescente", icon: "lua-crescente.png" },
        "11-09": { name: "Lua Cheia", icon: "lua-cheia.png" },
        "17-09": { name: "Lua Minguante", icon: "lua-minguante.png" },
        "24-09": { name: "Lua Nova", icon: "lua-nova.png" },
        "02-10": { name: "Lua Crescente", icon: "lua-crescente.png" },
        "10-10": { name: "Lua Cheia", icon: "lua-cheia.png" },
        "17-10": { name: "Lua Minguante", icon: "lua-minguante.png" },
        "24-10": { name: "Lua Nova", icon: "lua-nova.png" },
        "01-11": { name: "Lua Crescente", icon: "lua-crescente.png" },
        "09-11": { name: "Lua Cheia", icon: "lua-cheia.png" },
        "15-11": { name: "Lua Minguante", icon: "lua-minguante.png" },
        "22-11": { name: "Lua Nova", icon: "lua-nova.png" },
        "01-12": { name: "Lua Crescente", icon: "lua-crescente.png" },
        "08-12": { name: "Lua Cheia", icon: "lua-cheia.png" },
        "15-12": { name: "Lua Minguante", icon: "lua-minguante.png" },
        "22-12": { name: "Lua Nova", icon: "lua-nova.png" },
        "30-12": { name: "Lua Crescente", icon: "lua-crescente.png" }
    };

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    function createCalendar(year, month) {
        calendarDiv.innerHTML = '';
        feriadosList.innerHTML = '';
        fasesLuaList.innerHTML = '';
        
        // Atualiza o título do mês
        monthTitle.textContent = `${monthNames[month]} ${year}`;

        const date = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

        // Cabeçalho dos dias da semana
        weekDays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('day-header');
            dayHeader.textContent = day;
            calendarDiv.appendChild(dayHeader);
        });

        // Preenche dias vazios antes do primeiro dia do mês
        for (let i = 0; i < date.getDay(); i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day');
            calendarDiv.appendChild(emptyCell);
        }

        // Preenche os dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            const formattedDay = String(day).padStart(2, '0') + '-' + String(month + 1).padStart(2, '0');

            // Cria parágrafo para o número do dia
            const dayNumber = document.createElement('h3');
            dayNumber.textContent = day;

            // Adiciona o número do dia na div
            dayDiv.appendChild(dayNumber);

            // Feriados
            if (feriadosBrasil[formattedDay]) {
                const holidayText = document.createElement('p');
                holidayText.textContent = feriadosBrasil[formattedDay];
                holidayText.classList.add('holiday-text');
                dayDiv.appendChild(holidayText);
                feriadosList.innerHTML += `<li>${formattedDay}: ${feriadosBrasil[formattedDay]}</li>`;
            }

            // Fases da Lua
            if (moonPhases[formattedDay]) {
                dayDiv.classList.add('moon-phase');
                const moonIcon = moonPhases[formattedDay].icon;
                const moonName = moonPhases[formattedDay].name;
                
                // Adiciona o ícone da fase da lua
                const img = document.createElement('img');
                img.src = `../ProjetoCalendario/icons/${moonIcon}`;  // Ajuste do caminho
                img.alt = moonName;
                dayDiv.appendChild(img);

                // Adiciona o ícone da fase da lua legenda
                const legenda = document.createElement('img');
                legenda.src = `../ProjetoCalendario/icons/${moonIcon}`;  // Ajuste do caminho
                legenda.alt = moonName;
                legenda.width = "30"
                fasesLuaList.appendChild(legenda);
               
                fasesLuaList.innerHTML +=  `<div> ${formattedDay}: ${moonName}</div>`;
                
            }

            calendarDiv.appendChild(dayDiv);
        }
    }

    function updateCalendar() {
        createCalendar(currentYear, currentMonth);
    }

    // Atualiza o calendário quando o ano é alterado
    yearInput.addEventListener('change', function() {
        currentYear = parseInt(this.value);
        updateCalendar();
    });

    // Retrocede para o mês anterior
    prevMonthButton.addEventListener('click', function() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
            yearInput.value = currentYear;
        } else {
            currentMonth--;
        }
        updateCalendar();
    });

    // Avança para o próximo mês
    nextMonthButton.addEventListener('click', function() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
            yearInput.value = currentYear;
        } else {
            currentMonth++;
        }
        updateCalendar();
    });

    //Gerar PDF
    document.getElementById('download').addEventListener('click', () => {
        const element = document.getElementById('content');
        html2pdf()        
            .from(element)
            .set({
                margin: [1, 1, 1, 1],
                filename: 'calendario.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 5 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
            })
            .save();
    
    });

    // Inicializa o calendário com o mês e ano atuais
    updateCalendar();
});
