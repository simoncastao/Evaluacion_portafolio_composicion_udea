export enum UserRole {
  ADMIN = 'ADMIN',
  EVALUATOR = 'EVALUATOR'
}

export interface User {
  email: string;
  role: UserRole;
  name?: string;
  password?: string; // Admin assigns this
}

export interface RubricLevel {
  score: number;
  description: string;
}

export interface RubricItem {
  id: string;
  title: string;
  description?: string;
  levels: RubricLevel[]; // 0 to 5
  minWeightConfig: number; // Set by admin (percentage)
  maxWeightConfig: number; // Set by admin (percentage)
}

export interface RubricCategory {
  id: string;
  title: string;
  description?: string;
  items: RubricItem[];
}

export interface EvaluationItem {
  score: number; // 0-5
  weight: number; // Percentage chosen by evaluator
  comment?: string;
}

export interface Evaluation {
  id: string;
  studentName: string;
  evaluatorEmail: string;
  date: string;
  items: Record<string, EvaluationItem>; // Keyed by RubricItem.id
  finalScore: number;
  totalWeight: number; // Should sum to 100
}

export type AppState = 'LOGIN' | 'DASHBOARD' | 'ADMIN_PANEL' | 'EVALUATE' | 'RESULTS';