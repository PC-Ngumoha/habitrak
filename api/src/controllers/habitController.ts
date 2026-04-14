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

// Edit a habit
export const editHabit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    console.log(id);
    const { name } = req.body;
    await prisma.habit.update({ where: { id }, data: { name }});
    res.json({ message: "Updated successfully !"});
  } catch (error) {
    next(error);
  }
}

// Delete a habit
export const deleteHabit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const deletedHabit = await prisma.habit.delete({ where: { id }});
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
}