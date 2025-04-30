import { User } from "../interfaces/user";

export const mockUsers: User[] = [
    {
      id: '1a2b3c4d5e',
      name: 'João Silva',
      email: 'joao.silva@example.com',
      password: 'hashed_password_123',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      storeId: 'store_001',
      role: 'administrador',
      status: 'ativo'
    },
    {
      id: '2b3c4d5e6f',
      name: 'Maria Oliveira',
      email: 'maria.oliveira@example.com',
      password: 'hashed_password_456',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8',
      storeId: 'store_002',
      role: 'administrador',
      status: 'ativo'
    },
    {
      id: '3c4d5e6f7g',
      name: 'Carlos Souza',
      email: 'carlos.souza@example.com',
      password: 'hashed_password_789',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ7',
      storeId: 'store_003',
      role: 'administrador',
      status: 'inativo'
    },
    {
      id: '4d5e6f7g8h',
      name: 'Ana Lima',
      email: 'ana.lima@example.com',
      password: 'hashed_password_321',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ6',
      storeId: 'store_004',
      role: 'administrador',
      status: 'ativo'
    }
  ];
  