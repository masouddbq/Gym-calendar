document.addEventListener("DOMContentLoaded", () => {
  const monthYear = document.querySelector(".month-year");
  const daysContainer = document.querySelector(".days");

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  let currentDate = new Date();
  let today = new Date();

  // ─── بیرون از renderCalendar ───
  const workouts = [
    {
      id: "leg",
      title: "Leg Day",
      exerecises: ["Barbell Squat", "Romanian Deadlift", "Leg Press", "Walking Lunges", "Leg Extension"],
      icon: "./images/leg.png",
    },
    {
      id: "chest",
      title: "Chest Day",
      exerecises: ["Barbell Bench Press", "Incline Dumbbell Press", "Chest Fly", "Push-Up", "Cable Crossover"],
      icon: "./images/chest.png",
    },
    {
      id: "shoulder",
      title: "Shoulder Day",
      exerecises: ["Overhead Press", "Dumbbell Lateral Raise", "Front Raise", "Rear Delt Fly", "Arnold Press"],
      icon: "./images/shoulder.jpg",
    },
    {
      id: "arm",
      title: "Arms Day",
      exerecises: ["Barbell Curl", "Hammer Curl", "Tricep Pushdown", "Skull Crusher", "Concentration Curl"],
      icon: "./images/Arms.png",
    },
  ];

  // key منحصربه‌فرد برای هر روز
  function getKey(date, dayNumber) {
    return `${date.getFullYear()}-${date.getMonth()}-${dayNumber}`;
  }

  // ذخیره توی localStorage
  function saveDay(dayNumber, workoutId) {
    const key = getKey(currentDate, dayNumber);
    localStorage.setItem(key, workoutId);
  }

  // حذف از localStorage
  function removeDay(dayNumber) {
    const key = getKey(currentDate, dayNumber);
    localStorage.removeItem(key);
  }

  // خوندن از localStorage
  function getSavedDay(date, dayNumber) {
    const key = getKey(date, dayNumber);
    return localStorage.getItem(key);
  }
  // ──────────────────────────────────

  function renderCalendar(date) {

    function closeCard() {
      const checkBtns = document.querySelectorAll(".check");
      const closeBtns = document.querySelectorAll(".close");
      checkBtns.forEach((checkBtn) => {
        checkBtn.addEventListener("click", () => {
          droppedCard.classList.add("hide");
          workoutCard.classList.add("hide");
        });
      });
      closeBtns.forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
          droppedCard.classList.add("hide");
          workoutCard.classList.add("hide");
        });
      });
    }

    daysContainer.innerHTML = "";

    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    for (let i = firstDay; i > 0; i--) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = prevMonthLastDay - i + 1;
      dayDiv.classList.add("fade", "day-div");
      daysContainer.appendChild(dayDiv);
    }

    monthYear.textContent = `${months[month]} ${year}`;

    for (let i = 1; i <= lastDay; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = i;
      dayDiv.classList.add("day-div");

      if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        dayDiv.classList.add("today", "day-div");
      }

      daysContainer.appendChild(dayDiv);
    }

    const nextMonthFirstDay = 7 - new Date(year, month + 1, 1).getDay();
    for (let i = 1; i <= nextMonthFirstDay; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = i;
      dayDiv.classList.add("fade", "day-div");
      daysContainer.appendChild(dayDiv);
    }

    const dayDivs = document.querySelectorAll(".day-div");
    const droppedCard = document.querySelector(".dropped-card");
    const workoutCard = document.querySelector(".workout-card");
    const tasks = document.querySelectorAll(".tsk-container .tsk-item");

    function boldTask(item) {
      if (item.classList.contains("different")) return;
      const activeItem = document.querySelector(".different");
      if (activeItem) activeItem.classList.remove("different");
      item.classList.add("different");
    }

    let selectedTask = null;
    tasks.forEach((task) => {
      task.addEventListener("dragstart", () => {
        selectedTask = task;
      });
    });

    tasks.forEach((task) => {
      task.addEventListener("click", () => {
        workoutCard.classList.remove("hide");
        const workoutId = task.dataset.workout;
        const selectedWorkout = workouts.find((workout) => workout.id === workoutId);
        if (!selectedWorkout) return;

        workoutCard.innerHTML = `<div class="workout-header"> 
          <i class="bi bi-check-circle check"></i>
          <h3 style="color:white;">${workoutId}</h3>
          <i class="bi bi-x-circle close"></i>
        </div>`;

        const workoutList = document.createElement("ul");
        workoutList.classList.add("workout-items");
        selectedWorkout.exerecises.forEach((exercise) => {
          const li = document.createElement("li");
          li.classList.add("wt-item");
          li.innerHTML = `<span class="item-num">1</span>
            <h3 class="item-text">${exercise}</h3>
            <img class="wt-icon" src="./images/leg.png" alt="">`;
          workoutList.appendChild(li);
        });
        workoutCard.append(workoutList);
        closeCard();
      });
    });

    // ─── خوندن از localStorage و اعمال روی روزها ───
    dayDivs.forEach((dayDiv) => {
      // فقط روزهای ماه جاری (نه fade)
      if (dayDiv.classList.contains("fade")) return;

      const dayNumber = dayDiv.textContent.trim();
      const savedId = getSavedDay(date, dayNumber);

      if (savedId) {
        const savedWorkout = workouts.find((item) => item.id === savedId);
        if (savedWorkout) {
          dayDiv.innerHTML += `<img src="${savedWorkout.icon}">`;
          dayDiv.style.backgroundColor = "#ff8c00";
          dayDiv.style.border = "1px dashed white";
          dayDiv.style.color = "white";
        }
      }
    });
    // ───────────────────────────────────────────────

    let activeDayBox = [];

    dayDivs.forEach((dayDiv) => {
      dayDiv.addEventListener("click", () => {
        activeDayBox = [];
        activeDayBox.push(dayDiv);

        droppedCard.classList.remove("hide");
        let dayNumber = document.getElementById("card-day");
        dayNumber.innerHTML = `${months[currentDate.getMonth()]} , Day ${dayDiv.textContent}`;

        const droppedCardTasks = droppedCard.querySelectorAll(".tsk-item");

        // پاک کردن listener های قدیمی
        droppedCardTasks.forEach((task) => {
          const newTask = task.cloneNode(true);
          task.parentNode.replaceChild(newTask, task);
        });

        const freshTasks = droppedCard.querySelectorAll(".tsk-item");
        freshTasks.forEach((task) => {
          task.addEventListener("click", (e) => {
            e.preventDefault();
            boldTask(task);

            const workoutId = task.dataset.workout;
            const selectedWorkout = workouts.find((item) => item.id === workoutId);
            const currentImg = activeDayBox[0].querySelector("img");
            const currentDayNumber = activeDayBox[0].textContent.trim();

            if (currentImg) {
              if (currentImg.src.includes(selectedWorkout.icon)) {
                // toggle: همون آیکون رو دوباره زد، پاک کن
                activeDayBox[0].innerHTML = currentDayNumber;
                activeDayBox[0].style.backgroundColor = "transparent";
                activeDayBox[0].style.border = "";
                activeDayBox[0].style.color = "";
                removeDay(currentDayNumber); // ─── حذف از localStorage
                return;
              }
              currentImg.remove();
            }

            activeDayBox[0].innerHTML += `<img src="${selectedWorkout.icon}">`;
            activeDayBox[0].style.backgroundColor = "#ff8c00";
            activeDayBox[0].style.border = "1px dashed white";
            activeDayBox[0].style.color = "white";
            saveDay(currentDayNumber, selectedWorkout.id); // ─── ذخیره توی localStorage

            const cleanBtn = document.querySelector(".clean-btn");
            cleanBtn.onclick = () => {
              task.classList.remove("different");
              const dn = activeDayBox[0].textContent.trim();
              activeDayBox[0].innerHTML = dn;
              activeDayBox[0].style.backgroundColor = "transparent";
              activeDayBox[0].style.border = "";
              activeDayBox[0].style.color = "";
              removeDay(dn); // ─── حذف از localStorage
            };
          });
        });

        closeCard();
      });

      dayDiv.addEventListener("dragover", (e) => {
        e.preventDefault();
        dayDiv.style.backgroundColor = "red";
        dayDiv.style.color = "white";
        e.dataTransfer.dropEffect = "move";
        dayDiv.addEventListener("dragleave", () => {
          dayDiv.style.backgroundColor = "";
          dayDiv.style.color = "";
          dayDiv.style.transition = "0.3s ease";
        });
      });

      dayDiv.addEventListener("drop", (e) => {
        e.preventDefault();
        if (dayDiv.querySelector("img")) return;
        const workoutId = selectedTask.dataset.workout;
        const selectedWorkout = workouts.find((item) => item.id === workoutId);
        if (selectedWorkout) {
          dayDiv.innerHTML += `<img src="${selectedWorkout.icon}">`;
          dayDiv.classList.add("day-div");
          dayDiv.style.backgroundColor = "#ff8c00";
          dayDiv.style.border = "1px dashed white";
          dayDiv.style.color = "white";
          saveDay(dayDiv.textContent.trim(), selectedWorkout.id); // ─── ذخیره drag & drop
        }
      });
    });

    closeCard();
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
});