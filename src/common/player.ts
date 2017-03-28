export interface Player {
  id: string;
  progress: number;
  state: 'READY' | 'NOT_READY';
}
