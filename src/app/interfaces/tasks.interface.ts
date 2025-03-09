export interface PaginatedTasks {
  totalPages: number;
  limit: number;
  total: number;
  data: Task[];
  page: number;
}

export interface Task {
  status: "pending" | "completed";
  description: string;
  createdAt: string;
  updatedAt: string;
  owners: string[];
  title: string;
  id: string;
}

export enum TaskStatus {
  COMPLETED = "completed",
  PENDING = "pending",
}
