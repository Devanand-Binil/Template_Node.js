import db from '../db/index.js';
import { examples } from '../db/schema.js'; 

export const getExampleData = async (req, res) => {
  try {
    const result = await db.select().from(examples); 
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
};

export const createExampleData = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: 'Message required' });

    const result = await db.insert(examples).values({ message }).returning();
    res.status(201).json({ message: 'Created', data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error inserting data' });
  }
};
