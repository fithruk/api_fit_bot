class WorkoutProgram {
  #numberOfCurrentWorkout;
  #weightAdjustment = [
    0.65, 0.7, 0.73, 0.75, 0.65, 0.7, 0.75, 0.78, 0.84, 0.72,
  ]; // Проценты от ПМ для нахожнения веса
  #PMs = {};
  #f = {
    "60%": 0.7,
    "65%": 0.8,
    "70%": 0.9,
    "72%": 1,
    "75%": 1.2,
    "78%": 1.4,
    "81%": 1.6,
    "85%": 1.9,
    "88%": 2.4,
    "92%": 3.2,
    "94%": 4,
    "96%": 5,
  };
  #KPSH = [25, 25, 24, 24, 30, 24, 24, 25, 16, 25];
  #exersices;
  #WP = [];

  constructor(options) {
    this.#numberOfCurrentWorkout = 0;
    this.#PMs = options.PMs;
    this.#exersices = options.exersices;
  }

  generateWorkoutsPlans() {
    for (
      let index = this.#numberOfCurrentWorkout;
      index < this.#exersices.length;
      index++
    ) {
      this.#WP.push(this.generateAppartWP(index));
    }
    console.log(this.#WP);
  }

  generateAppartWP(numberOfCurrentWorkout) {
    //ПМ * % от ПМ / 100

    return new WorkoutPlan(
      this.#exersices[numberOfCurrentWorkout],
      this.#KPSH[numberOfCurrentWorkout],
      this.#weightAdjustment[numberOfCurrentWorkout]
    ).calculateLoadByExersice(this.#PMs, numberOfCurrentWorkout);
  }
}

class WorkoutPlan {
  #targetExersices;
  #targetKPSH;
  #workoutPlan = [];
  #weightAdjustment;
  constructor(targetExersices, targetKPSH, weightAdjustment) {
    this.#targetExersices = targetExersices;
    this.#targetKPSH = targetKPSH;
    this.#weightAdjustment = weightAdjustment;
  }

  calculateLoadByExersice(PMs) {
    this.#targetExersices.forEach((ex) => {
      this.#workoutPlan.push(
        new ExercisePlan(
          ex,
          PMs[ex],
          this.#targetKPSH,
          this.#weightAdjustment
        ).prepateExercisePlan()
      );
    });

    return this.#workoutPlan;
  }
}

class ExercisePlan {
  #PM;
  #exersice;
  #sets;
  #reps;
  #weight;
  #KPSH;
  #tonnage;
  #weightAdjustment;
  constructor(exersice, PM, KPSH, weightAdjustment) {
    this.#exersice = exersice;
    this.#PM = PM;
    this.#KPSH = KPSH;
    this.#weightAdjustment = weightAdjustment;
  }

  prepateExercisePlan() {
    this.#countWeightAndTonnage();
    this.#countLoad();
    return {
      sets: this.#sets,
      reps: this.#reps,
      weight: this.#weight,
      exersice: this.#exersice,
    };
  }

  #countWeightAndTonnage() {
    this.#weight = Math.floor(this.#PM * this.#weightAdjustment);
    while (this.#weight % 2.5 != 0) {
      this.#weight += 0.5;
    }
    this.#tonnage = this.#KPSH * this.#weight;
  }

  #countLoad() {
    let averageWeight = this.#tonnage / this.#KPSH;
    let possibleCombinations = [];

    for (let reps = 1; reps <= this.#KPSH; reps++) {
      if (this.#KPSH % reps === 0) {
        let sets = this.#KPSH / reps;
        possibleCombinations.push({
          sets: sets,
          reps: reps,
          averageWeight: averageWeight,
        });
      }
    }
    possibleCombinations = possibleCombinations.filter(
      (item) => item.sets <= 6 && item.sets > 2
    );
    this.#sets = possibleCombinations[0].sets;
    this.#reps = possibleCombinations[0].reps;
  }
}

const WPOptions = {
  PMs: {
    "Грудь - Средний_отдел_груди - Жим_штанги_лежа": 160,
    "Грудь - Верхний_отдел_груди - Наклонный_жим_лежа": 120,
    "Спина - С_горизонтальной_плоскости - Тяга_гантель_на_скамье": 100,
    "Спина - С_вертикальной_плоскости - Тяга_верхнего_блока": 105,
    "Руки - Бицепс - Сгибание_рук_со_штангой": 60,
    "Руки - Трицепс - Разгиб_с_верхнего_блока_вниз": 95,
  },
  exersices: [
    [
      "Грудь - Средний_отдел_груди - Жим_штанги_лежа",
      "Грудь - Верхний_отдел_груди - Наклонный_жим_лежа",
      "Спина - С_горизонтальной_плоскости - Тяга_гантель_на_скамье",
      "Спина - С_вертикальной_плоскости - Тяга_верхнего_блока",
      "Руки - Бицепс - Сгибание_рук_со_штангой",
      "Руки - Трицепс - Разгиб_с_верхнего_блока_вниз",
    ],
  ],
};
