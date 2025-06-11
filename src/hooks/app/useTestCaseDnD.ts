import { TestCase } from '@/types/models/TestCase';
import { create } from 'zustand';

interface DnDState {
    type: string | null;
    name: string | null;
    testCase: TestCase | null
    setDnD: (type: string | null, name: string | null, testCase: TestCase | null) => void;
}

export const useTestCaseDnD = create<DnDState>((set) => ({
    type: null,
    name: null,
    testCase: null,
    setDnD: (type, name, testCase) => set({ type, name, testCase }),
}));