document.addEventListener('DOMContentLoaded', () => {
    // Находим кнопку (исправлен селектор, т.к. в HTML написано .btn2 с точкой)
    const button2 = document.querySelector('.btn2');
    if (!button2) {
        console.error('Кнопка с классом .btn2 не найдена');
        return;
    }

    // Вешаем обработчик клика
    button2.addEventListener('click', calculateHealthScore);

    function calculateHealthScore() {
        // 1. Получаем все выбранные значения
        const selectedValues = {};
        const allRadios = document.querySelectorAll('input[type="radio"]:checked');
        
        allRadios.forEach(radio => {
            selectedValues[radio.name] = radio.value;
        });

        // 2. Считаем баллы
        let totalScore = 0;
        
        // Логика для каждого вопроса
        // Вопрос №1: Моете руки после улицы? (Да - +2, Нет - -1)
        if (selectedValues['1']) {
            totalScore += selectedValues['1'] === '1' ? 2 : -1;
        }
        
        // Вопрос №2: Проветриваете комнату? (Да - +2, Нет - -1)
        if (selectedValues['2']) {
            totalScore += selectedValues['2'] === '1' ? 2 : -1;
        }
        
        // Вопрос №3: Чистите зубы? (Да - +2, Нет - -1)
        if (selectedValues['3']) {
            totalScore += selectedValues['3'] === '1' ? 2 : -1;
        }
        
        // Вопрос №4: Моете руки после туалета? (Да - +2, Нет - -1)
        if (selectedValues['4']) {
            totalScore += selectedValues['4'] === '1' ? 2 : -1;
        }
        
        // Вопрос №5: Меняете трусы раз в неделю? (Да - +2, Нет - -1)
        if (selectedValues['5']) {
            totalScore += selectedValues['5'] === '1' ? 2 : -1;
        }
        
        // Вопрос №6: Курите? (плохая привычка)
        // Значения: 1=раз в месяц, 2=раз в неделю, 3=каждый день, 4=нет
        if (selectedValues['6']) {
            const smokeValue = selectedValues['6'];
            if (smokeValue === '1') totalScore -= 2;      // раз в месяц (-2)
            else if (smokeValue === '2') totalScore -= 3;  // раз в неделю (-3)
            else if (smokeValue === '3') totalScore -= 5;  // каждый день (-5)
            else if (smokeValue === '4') totalScore += 2;  // не курит (+2)
        }
        
        // Вопрос №7: Едите сладости/фастфуд? (вредная привычка, но не жёсткая)
        // 1=раз в месяц, 2=раз в неделю, 3=каждый день, 4=никогда
        if (selectedValues['7']) {
            const foodValue = selectedValues['7'];
            if (foodValue === '1') totalScore -= 1;      // раз в месяц (-1)
            else if (foodValue === '2') totalScore -= 2;  // раз в неделю (-2)
            else if (foodValue === '3') totalScore -= 3;  // каждый день (-3)
            else if (foodValue === '4') totalScore += 2;  // никогда (+2)
        }
        
        // Вопрос №8: Проблемы с лишним весом? (Есть - -1, Нет - +2)
        if (selectedValues['8']) {
            totalScore += selectedValues['8'] === '1' ? -1 : 2;
        }
        
        // Вопрос №9: Моете руки перед мастурбацией? (Да - +2, Нет - -1)
        if (selectedValues['9']) {
            totalScore += selectedValues['9'] === '1' ? 2 : -1;
        }
        
        // Вопрос №10: Как справляетесь со стрессом?
        // 1=музыка, 2=заедаю, 3=грызу ногти, 4=самоповреждение
        if (selectedValues['10']) {
            const stressValue = selectedValues['10'];
            if (stressValue === '1') totalScore += 2;      // музыка (+2)
            else if (stressValue === '2') totalScore -= 2;  // заедаю (-2)
            else if (stressValue === '3') totalScore -= 1;  // грызу ногти (-1)
            else if (stressValue === '4') totalScore -= 7;  // самоповреждение (-5)
        }
        
        // Вопрос №11: Пьёте/употребляете?
        // 1=Да, 2=Нет, 3=Иногда
        if (selectedValues['11']) {
            const drinkValue = selectedValues['11'];
            if (drinkValue === '1') totalScore -= 6;       // да (-5)
            else if (drinkValue === '2') totalScore += 2;  // нет (+2)
            else if (drinkValue === '3') totalScore -= 3;  // иногда (-3)
        }
        
        // Вопрос №12: Меняете постельное бельё?
        // 1=Ежедневно, 2=Раз в месяц, 3=Изредка, 4=Никогда
        if (selectedValues['12']) {
            const bedValue = selectedValues['12'];
            if (bedValue === '1') totalScore += 2;       // ежедневно (+2)
            else if (bedValue === '2') totalScore -= 1;   // раз в месяц (-1)
            else if (bedValue === '3') totalScore -= 2;   // изредка (-2)
            else if (bedValue === '4') totalScore -= 3;   // никогда (-3)
        }
        
        // 3. Проверяем, что ответили на все вопросы
        const totalQuestions = 12;
        const answeredCount = Object.keys(selectedValues).length;
        
        if (answeredCount < totalQuestions) {
            alert(`Вы ответили только на ${answeredCount} из ${totalQuestions} вопросов.\nОтветьте на все вопросы, чтобы получить результат.`);
            return;
        }
        
        // 4. Выводим результат
        let resultMessage = '';
        let resultClass = '';
      
        if (totalScore >= 15) {
            resultMessage = 'Отлично! Вы ведёте очень здоровый образ жизни!';
            resultClass = 'excellent';
        } else if (totalScore >= 8) {
            resultMessage = 'Хорошо! Но есть куда расти. Обратите внимание на вредные привычки.';
            resultClass = 'good';
        } else if (totalScore >= 0) {
            resultMessage = 'Средний результат. Многие привычки требуют коррекции.';
            resultClass = 'average';
        } else if (totalScore >= -10) {
            resultMessage = 'Низкий уровень заботы о здоровье. Стоит серьёзно задуматься!';
            resultClass = 'low';
        } else {
            resultMessage = 'Критический уровень! Ваши привычки серьёзно вредят здоровью. Нужна помощь специалиста.';
            resultClass = 'critical';
        }
        
        // Создаём или обновляем блок с результатом
        let resultDiv = document.getElementById('health-result');
        if (!resultDiv) {
            resultDiv = document.createElement('div');
            resultDiv.id = 'health-result';
            const contentDiv = document.querySelector('.content');
            if (contentDiv) {
                contentDiv.appendChild(resultDiv);
            } else {
                document.body.appendChild(resultDiv);
            }
        }
        
        resultDiv.className = `result-block ${resultClass}`;
        resultDiv.innerHTML = `
            <h3>Результат опроса</h3>
            <p><strong>Ваши баллы здоровья: ${totalScore}</strong> (из возможных ~24)</p>
            <p>${resultMessage}</p>
          `;
    }
});