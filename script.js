document.addEventListener('DOMContentLoaded' , () => {
    const monthYear = document.querySelector('.month-year')
    const daysContainer = document.querySelector('.days')

    const months = [
        'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
    ]

    let currentDate = new Date();
    let today = new Date();

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year , month , 1).getDay()
        const lastDay = new Date(year , month + 1 , 0).getDate()

        console.log(firstDay);
        

        const prevMonthLastDay = new Date(year , month , 0).getDate()
        for (let i = firstDay; i > 0; i--) {
            const dayDiv = document.createElement('div')
            dayDiv.textContent = prevMonthLastDay - i + 1
            dayDiv.classList.add('fade')
            daysContainer.appendChild(dayDiv)
        }
        
        
        
        

        monthYear.textContent = `${months[month]} ${year}`

        // daysContainer.innerHTML = '';
        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement('div')
            dayDiv.textContent = i
            
            if(i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today')
            }

            daysContainer.appendChild(dayDiv)
        }

    }

    renderCalendar(currentDate)
    
})


