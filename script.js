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
    const tasks = document.querySelectorAll(".tsk-item");

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

    let selectedTask = null;

    tasks.forEach((task) => {
      task.addEventListener("dragstart", () => {
        selectedTask = task;
      });
    });


    function boldTask(item) {
      if (item.classList.contains('different')) {
        return;
      } 

      const activeItem = document.querySelector('.different')

      if(activeItem) {
        activeItem.classList.remove('different')
      }

      item.classList.add('different')
    }

    

    dayDivs.forEach((dayDiv) => {
      dayDiv.addEventListener("click", () => {
        droppedCard.classList.remove("hide");
        let dayNumber = document.getElementById("card-day");
        dayNumber.innerHTML = `${months[currentDate.getMonth()]} , Day ${dayDiv.textContent}`;

        const droppedCardTasks = droppedCard.querySelectorAll(".tsk-item");
        

        

        droppedCardTasks.forEach((task) => {
          task.addEventListener("click", (e) => {
            e.preventDefault();

            // selectedTask = task;
            boldTask(task);
            droppedCard.classList.add("hide");
            workoutCard.classList.add("hide");

            const workoutId = task.dataset.workout;

            const selectedWorkout = workouts.find(
              (item) => item.id === workoutId,
            );

            
            if (dayDiv.querySelector("img")) return;

            
            dayDiv.innerHTML += `<img src="${selectedWorkout.icon}">`;
            dayDiv.classList.add("day-div");
            dayDiv.style.backgroundColor = "#ff8c00";
            dayDiv.style.border = "1px dashed white";
            dayDiv.style.color = "white";
          });
        });
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
