/* El seed es la información que queremos insertar a la DB
de manera automática */

interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente: Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'En progeso: Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Terminadas: Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
};
