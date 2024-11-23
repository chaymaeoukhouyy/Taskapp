export interface Task {
  title: string;
  description?: string; // La description est optionnelle
  dueDate?: Date;
  members?: string[];
}
