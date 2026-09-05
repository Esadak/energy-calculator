import { prisma } from '../client';

export const userRepository = {
  /**
   * Hitta användare via email (förberett för framtida auth)
   */
  async findByEmail(email: string) {
    // Just nu returnerar vi bara en mock, men här kan vi senare koppla 
    // till en riktig User-tabell om vi lägger till den i Prisma-schemat.
    return null;
  },
};