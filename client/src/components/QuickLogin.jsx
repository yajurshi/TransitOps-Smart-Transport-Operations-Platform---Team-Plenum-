import { ArrowRight } from 'lucide-react';
import { Button } from './ui/FormControls';

export const QuickLogin = ({ role, onSelect }) => <Button type="button" onClick={() => onSelect(role)} className="group w-full justify-between border border-slate-200 bg-white px-3.5 py-2.5 text-left text-sm text-slate-700 hover:border-amber-300 hover:bg-amber-50"><span>{role}</span><ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-amber-600" /></Button>;
