document.addEventListener("DOMContentLoaded", () => {
  const monthYear = document.querySelector(".month-year");
  const daysContainer = document.querySelector(".days");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentDate = new Date();
  let today = new Date();

  function renderCalendar(date) {
    daysContainer.innerHTML = "";


    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    console.log(firstDay);

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDay; i > 0; i--) {
      const dayDiv = document.createElement("div");
      dayDiv.addEventListener('dragover' , () => {
        console.log('dragover');
      })
      dayDiv.textContent = prevMonthLastDay - i + 1;
      dayDiv.classList.add("fade", "day-div");
      daysContainer.appendChild(dayDiv);
    }

    const monthLastDay = new Date(year, month + 1, 0).getDay();
    console.log(monthLastDay);

    monthYear.textContent = `${months[month]} ${year}`;

    for (let i = 1; i <= lastDay; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.addEventListener('dragover' , () => {
        console.log('dragover');
      })
      dayDiv.textContent = i;
      dayDiv.classList.add("day-div")

      if (
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayDiv.classList.add("today", "day-div");
      }

      daysContainer.appendChild(dayDiv);
    }

    const nextMonthFirstDay = 7 - new Date(year, month + 1, 1).getDay(); // 3

    for (let i = 1; i <= nextMonthFirstDay; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.addEventListener('dragover' , () => {
        console.log('dragover');
      })
      dayDiv.textContent = i;
      dayDiv.classList.add("fade", "day-div");
      daysContainer.appendChild(dayDiv);
    }
  }

  renderCalendar(currentDate);

  const nextArrow = document.querySelector(".next");
  const prevArrow = document.querySelector(".prev");

  nextArrow.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });
  prevArrow.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });



 
  const dayDivs = document.querySelectorAll('.day-div')
  dayDivs.forEach((dayDiv) => {
    dayDiv.addEventListener('dragover' , (e) => {
      e.preventDefault();
      dayDiv.style.backgroundColor = 'red';
      dayDiv.style.color = 'white';
      e.dataTransfer.dropEffect = 'move';

      dayDiv.addEventListener('dragleave' , () => {
        dayDiv.style.backgroundColor = '';
        dayDiv.style.color = '';
        dayDiv.style.transition = '0.3s ease' ;
      })

      dayDiv.addEventListener('drop' ,() => {
        dayDiv.style.backgroundColor = '';
        dayDiv.style.color = '';
      })
    })
  })
});


