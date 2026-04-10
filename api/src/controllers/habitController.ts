import { Request, Response, NextFunction } from 'express';
import { Habit, habits } from '../models/habit';


// Read all habits
export const getHabits = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(habits);
  } catch (error) {
    next(error);
  }
}

// Create a new habit
export const createHabit = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const newHabit: Habit = { id: Date.now(), name };
    habits.push(newHabit);
    res.status(201).json(newHabit);
  } catch (error) {
    next(error);
  }
}