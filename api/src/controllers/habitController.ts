import { Request, Response, NextFunction } from 'express';
// import { Habit, habits } from '../models/habit';
import prisma from '../config/prisma';

class HabitController {

  get today() {
    return new Date().toISOString().split("T")[0];
  }

  getHabits = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id: userId } = req.user!;
      const habits = await prisma.habit.findMany({ where: { userId },
        include: { completions: true }});
      res.json(habits);
    } catch (error) {
      next(error);
    }
  }

  createHabit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const { user_id: userId} = req.user!;
      const newHabit = await prisma.habit.create({ data: { name, userId }});
      res.status(201).json(newHabit);
    } catch (error) {
      next(error);
    }
  }

  editHabit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const { user_id: userId } = req.user!;
      const { name } = req.body;
      await prisma.habit.update({ where: { id, userId }, data: { name }});
      res.json({ message: "Updated successfully !"});
    } catch (error) {
      next(error);
    }
  }

  deleteHabit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id as string, 10);
      const { user_id: userId } = req.user!;
      await prisma.habit.delete({ where: { id, userId }});
      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }

  markHabitAsDone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // mark a habit as "done" for the day
      const habitId = parseInt(req.params.id as string, 10);
      const newCompletion = await prisma.completion.create({ data: {
        habitId, date: this.today }});
      res.status(201).json(newCompletion);
    } catch (error) {
      next(error);
    }
  }

  unmarkHabitAsDone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Unmark habit as "done" for the day.
      const habitId = parseInt(req.params.id as string, 10);
      await prisma.completion.delete({
        where: { habitId, date: this.today }});
      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }
}

export default HabitController;
