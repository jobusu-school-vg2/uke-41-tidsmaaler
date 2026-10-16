export interface Timer {
    id: string;
    title: string;
    category: string;
    elapsed: number;
    isRunning: boolean;
    editFormOpen: boolean;
}