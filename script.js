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
      dayDiv.addEventListener("dragover", () => {
        console.log("dragover");
      });
      dayDiv.textContent = prevMonthLastDay - i + 1;
      dayDiv.classList.add("fade", "day-div");
      daysContainer.appendChild(dayDiv);
    }

    const monthLastDay = new Date(year, month + 1, 0).getDay();

    monthYear.textContent = `${months[month]} ${year}`;

    for (let i = 1; i <= lastDay; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.addEventListener("dragover", () => {
        console.log("dragover");
      });
      dayDiv.textContent = i;
      dayDiv.classList.add("day-div");

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
      dayDiv.addEventListener("dragover", () => {
        console.log("dragover");
      });
      dayDiv.textContent = i;
      dayDiv.classList.add("fade", "day-div");
      daysContainer.appendChild(dayDiv);
    }

    const dayDivs = document.querySelectorAll(".day-div");
    const droppedCard = document.querySelector(".dropped-card");
    const workoutCard = document.querySelector(".workout-card");
    const tasks = document.querySelectorAll(".tsk-container .tsk-item");

    const workouts = [
      {
        id: "leg",
        title: "Leg Day",
        exerecises: [
          "Barbell Squat",
          "Romanian Deadlift",
          "Leg Press",
          "Walking Lunges",
          "Leg Extension",
        ],
        icon: "./images/leg.png",
      },
      {
        id: "chest",
        title: "Chest Day",
        exerecises: [
          "Barbell Bench Press",
          "Incline Dumbbell Press",
          "Chest Fly",
          "Push-Up",
          "Cable Crossover",
        ],
        icon: "./images/chest.png",
      },
      {
        id: "shoulder",
        title: "Shoulder Day",
        exerecises: [
          "Overhead Press",
          "Dumbbell Lateral Raise",
          "Front Raise",
          "Rear Delt Fly",
          "Arnold Press",
        ],
        icon: "./images/shoulder.jpg",
      },
      {
        id: "arm",
        title: "Arms Day",
        exerecises: [
          "Barbell Curl",
          "Hammer Curl",
          "Tricep Pushdown",
          "Skull Crusher",
          "Concentration Curl",
        ],
        icon: "./images/Arms.png",
      },
    ];

    // تابع بولد کردن آیکون حرکت روز در کارت دراپ شده روز مدنظر
    function boldTask(item) {
      if (item.classList.contains("different")) {
        return;
      }

      const activeItem = document.querySelector(".different");

      if (activeItem) {
        activeItem.classList.remove("different");
      }

      item.classList.add("different");
    }

    // ========= پایان تابع بولد ===========

    // برای انتخاب تسک مورد نظر کلیک شده
    let selectedTask = null;

    tasks.forEach((task) => {
      task.addEventListener("dragstart", () => {
        selectedTask = task;
      });
    });
    // ========  پایان ===========

    // برای نمایش دادن لیست حرکات ورزشی از آرایه حرکات زمانی که روی لیست تسک ها در منو کلیک میشود

    tasks.forEach((task) => {
      task.addEventListener("click", () => {
        workoutCard.classList.remove("hide");
        const workoutId = task.dataset.workout;
        //  console.log(workoutId);

        const selectedWorkout = workouts.find(
          (workout) => workout.id === workoutId,
        );

        if (!selectedWorkout) return;
        workoutCard.innerHTML = ` <div class="workout-header"> 
                    <i class="bi bi-check-circle check"></i>
                    <h3 style="color :white;">${workoutId}</h3>
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

    //  ============== پایان  ===============

    // برای ایجاد پیمایش روی هر یک از روز های تقویم
    let activeDayBox = []; // آرایه‌ای که همیشه فقط یه عضو داره

    dayDivs.forEach((dayDiv) => {
      dayDiv.addEventListener("click", () => {
        // آرایه رو خالی کن و فقط روز جدید رو بذار توش
        activeDayBox = [];
        activeDayBox.push(dayDiv);        

        droppedCard.classList.remove("hide");
        let dayNumber = document.getElementById("card-day");
        dayNumber.innerHTML = `${months[currentDate.getMonth()]} , Day ${dayDiv.textContent}`;

        const droppedCardTasks = droppedCard.querySelectorAll(".tsk-item");
        droppedCardTasks.forEach((task) => {
          task.addEventListener("click", (e) => {
            console.log(task);

            e.preventDefault();

            boldTask(task);

            const workoutId = task.dataset.workout;
            const selectedWorkout = workouts.find(
              (item) => item.id === workoutId,
            );

            const currentImg = activeDayBox[0].querySelector("img");

            if (currentImg) {
              // اگر همون آیکون رو دوباره انتخاب کرد، پاکش کن (toggle)
              if (currentImg.src.includes(selectedWorkout.icon)) {
                activeDayBox[0].innerHTML = activeDayBox[0].textContent;
                activeDayBox[0].style.backgroundColor = "transparent";
                return;
              }
              // وگرنه img قدیمی رو پاک کن
              currentImg.remove();
            }

            activeDayBox[0].innerHTML += `<img src="${selectedWorkout.icon}">`;
            activeDayBox[0].classList.add("day-div");
            activeDayBox[0].style.backgroundColor = "#ff8c00";
            activeDayBox[0].style.border = "1px dashed white";
            activeDayBox[0].style.color = "white";

            const cleanBtn = document.querySelector(".clean-btn");

            cleanBtn.addEventListener("click", () => {
              task.classList.remove("different");
              activeDayBox[0].innerHTML = activeDayBox[0].textContent; // ✅ روز فعال
              activeDayBox[0].style.backgroundColor = "transparent";
            });
          });
        });

        closeCard();
      });
    });

    // ============  پایان پیمایش روی روز های تقویم ================
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
