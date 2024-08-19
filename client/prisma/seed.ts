import db from '@/app/db/db';
import { categories } from './data/data';

const seed = async () => {
  await db.category.deleteMany();
  for (const category of categories) {
    const c = await db.category.create({
      data: category,
    });
    console.log(c);
  }
};

seed();
