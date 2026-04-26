import { Request, Response, NextFunction } from 'express';
// import { Habit, habits } from '../models/habit';
import prisma from '../config/prisma';


// Read all habits
export const getHabits = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * - Get the user ID of the current authenticated user
   * - filter all habits by the auth user's ID
   * - Return the habits belonging to this particular user.
   */
  try {
    // res.json(habits);
    const { user_id: userId } = req.user!;
    const habits = await prisma.habit.findMany({ where: { userId },
      include: { completions: true }});
    res.json(habits);
  } catch (error) {
    next(error);
  }
}

// Create a new habit
export const createHabit = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * - Get the name from the request body
   * - Get the user ID of the current authenticated user
   * - Create a new habit with the name and the user ID
   * - Return the new habit created.
   */
  try {
    const { name } = req.body;
    const { user_id: userId} = req.user!;
    const newHabit = await prisma.habit.create({ data: { name, userId }});
    res.status(201).json(newHabit);
  } catch (error) {
    next(error);
  }
}

// Edit a habit
export const editHabit = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * - Get the id from the request parameters
   * - Get the user Id of the currently authenticated user.
   * - Get the name update from the request's body.
   * - Use the user Id to filter for the user to update
   * - Return confirmation of update when completed.
   */
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

// Delete a habit
export const deleteHabit = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * - Get the id of habit from the request parameter
   * - Get the user ID of the currently authenticated user.
   * - use the user ID to  filter the habit deletion query
   * - Return a 204 status response to indicate successful deletion.
   */

  try {
    const id = parseInt(req.params.id as string, 10);
    const { user_id: userId } = req.user!;
    await prisma.habit.delete({ where: { id, userId }});
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
    await prisma.completion.delete({
      where: { habitId, date: new Date().toISOString().split("T")[0]}});
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
}
