import { Request, Response, NextFunction } from 'express';
// import { Habit, habits } from '../models/habit';
import prisma from '../config/prisma';


// Read all habits
export const getHabits = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // res.json(habits);
    const habits = await prisma.habit.findMany({ include: { completions: true }});
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

// TODO: Implement feature
export const markAsDone = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // mark a habit as done for the day
    const habitId = parseInt(req.params.id as string, 10);
    const newCompletion = await prisma.completion.create({ data: {
      habitId, date: new Date().toISOString().split("T")[0]}});
    res.status(201).json(newCompletion);
  } catch (error) {
    next(error);
  }
}

// TODO: Implement feature
export const unmarkAsDone = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Undo mark habit as done for the day.
    const habitId = parseInt(req.params.id as string, 10);
    const deletedCompletion = await prisma.completion.delete({
      where: { habitId, date: new Date().toISOString().split("T")[0]}});
    res.json(deletedCompletion);
  } catch (error) {
    next(error);
  }
}
