import { Component } from '@/types/models/Provider';
import { create } from 'zustand';

interface DnDState {
    type: string | null;
    name: string | null;
    component: Component | null
    setDnD: (type: string | null, name: string | null, component: Component | null) => void;
}

export const useDnD = create<DnDState>((set) => ({
    type: null,
    name: null,
    component: null,
    setDnD: (type, name, component) => set({ type, name, component }),
}));