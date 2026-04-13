import { Request, Response, NextFunction } from 'express';
// import { Habit, habits } from '../models/habit';
import prisma from '../config/prisma';


// Read all habits
export const getHabits = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // res.json(habits);
    const habits = await prisma.habit.findMany();
    res.json(habits);
  } catch (error) {
    next(error);
  }
}

// Create a new habit
export const createHabit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    // const newHabit: Habit = { id: Date.now(), name };
    // habits.push(newHabit);
    const newHabit = await prisma.habit.create({ data: { name }});
    res.status(201).json(newHabit);
  } catch (error) {
    next(error);
  }
}