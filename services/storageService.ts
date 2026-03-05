import { Evaluation, RubricCategory, User } from '../types';
import { INITIAL_USERS, INITIAL_RUBRIC } from '../constants';

const KEYS = {
  USERS: 'app_users',
  RUBRIC: 'app_rubric',
  EVALUATIONS: 'app_evaluations',
  CURRENT_USER: 'app_current_user',
};

export const StorageService = {
  getUsers: (): User[] => {
    const stored = localStorage.getItem(KEYS.USERS);
    let users: User[] = stored ? JSON.parse(stored) : [...INITIAL_USERS];

    // Force sync Admin credentials from constants.
    // This ensures that if the code is updated with a new password, it overrides the local storage
    // solving the issue where you couldn't login with the new password because the old one was cached.
    INITIAL_USERS.forEach(initUser => {
      if (initUser.role === 'ADMIN') {
        const index = users.findIndex(u => u.email === initUser.email);
        if (index !== -1) {
          users[index].password = initUser.password;
        } else {
          users.push(initUser);
        }
      }
    });

    return users;
  },

  saveUsers: (users: User[]) => {
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  },

  getRubric: (): RubricCategory[] => {
    const stored = localStorage.getItem(KEYS.RUBRIC);
    return stored ? JSON.parse(stored) : INITIAL_RUBRIC;
  },

  saveRubric: (rubric: RubricCategory[]) => {
    localStorage.setItem(KEYS.RUBRIC, JSON.stringify(rubric));
  },

  getEvaluations: (): Evaluation[] => {
    const stored = localStorage.getItem(KEYS.EVALUATIONS);
    return stored ? JSON.parse(stored) : [];
  },

  saveEvaluation: (evaluation: Evaluation) => {
    const evaluations = StorageService.getEvaluations();
    const index = evaluations.findIndex(e => e.id === evaluation.id);
    if (index >= 0) {
      evaluations[index] = evaluation;
    } else {
      evaluations.push(evaluation);
    }
    localStorage.setItem(KEYS.EVALUATIONS, JSON.stringify(evaluations));
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(KEYS.CURRENT_USER);
    return stored ? JSON.parse(stored) : null;
  },

  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.CURRENT_USER);
    }
  },
  
  clearData: () => {
      localStorage.clear();
      window.location.reload();
  }
};