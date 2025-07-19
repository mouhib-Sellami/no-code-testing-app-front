import { TestCase } from '@/types/models/TestCase';
import { create } from 'zustand';

interface DnDState {
    type: string | null;
    name: string | null;
    component: TestCase | null
    setWorkFlowDnD: (type: string | null, name: string | null, component: TestCase | null) => void;
}

export const useWorkflowDnD = create<DnDState>((set) => ({
    type: null,
    name: null,
    component: null,
    setWorkFlowDnD: (type, name, component) => set({ type, name, component }),
}));