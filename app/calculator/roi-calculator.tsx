'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const currencyOptions = [
  { label: 'GBP', value: 'GBP' },
  { label: 'EUR', value: 'EUR' },
  { label: 'USD', value: 'USD' }
];

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function RoiCalculator() {
  const [systems, setSystems] = useState('2');
  const [costPerSystem, setCostPerSystem] = useState('52000');
  const [savingsRate, setSavingsRate] = useState('25');
  const [currentWeeks, setCurrentWeeks] = useState('12');
  const [pilotWeeks, setPilotWeeks] = useState('4');
  const [currency, setCurrency] = useState('GBP');

  const results = useMemo(() => {
    const systemCount = Math.max(0, toNumber(systems));
    const perSystem = Math.max(0, toNumber(costPerSystem));
    const savingsPct = Math.max(0, Math.min(100, toNumber(savingsRate)));
    const current = Math.max(0, toNumber(currentWeeks));
    const pilot = Math.max(0, toNumber(pilotWeeks));

    const annualCost = systemCount * perSystem;
    const estimatedSavings = annualCost * (savingsPct / 100);
    const timeSavedWeeks = Math.max(0, current - pilot);

    return {
      annualCost,
      estimatedSavings,
      timeSavedWeeks
    };
  }, [systems, costPerSystem, savingsRate, currentWeeks, pilotWeeks]);

  const formatter = useMemo(() => {
    try {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0
      });
    } catch {
      return new Intl.NumberFormat('en-GB', {
        maximumFractionDigits: 0
      });
    }
  }, [currency]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <Card className="border border-border/70 bg-white/90 p-6">
        <h2 className="font-heading text-xl font-semibold">Inputs</h2>
        <div className="mt-4 grid gap-4 text-sm text-muted-foreground">
          <label className="space-y-2">
            <span className="font-semibold text-foreground">
              High-risk systems
            </span>
            <Input
              value={systems}
              onChange={(event) => setSystems(event.target.value)}
              type="number"
              min={0}
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-foreground">
              Annual cost per system
            </span>
            <Input
              value={costPerSystem}
              onChange={(event) => setCostPerSystem(event.target.value)}
              type="number"
              min={0}
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-foreground">
              Expected savings (%)
            </span>
            <Input
              value={savingsRate}
              onChange={(event) => setSavingsRate(event.target.value)}
              type="number"
              min={0}
              max={100}
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-foreground">
              Current audit prep (weeks)
            </span>
            <Input
              value={currentWeeks}
              onChange={(event) => setCurrentWeeks(event.target.value)}
              type="number"
              min={0}
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-foreground">
              Target prep time (weeks)
            </span>
            <Input
              value={pilotWeeks}
              onChange={(event) => setPilotWeeks(event.target.value)}
              type="number"
              min={0}
            />
          </label>
          <label className="space-y-2">
            <span className="font-semibold text-foreground">Currency</span>
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
            >
              {currencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Card>
      <div className="space-y-6">
        <Card className="border border-border/70 bg-white/90 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Estimated savings
          </p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            {formatter.format(results.estimatedSavings)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Approximate annual savings based on your inputs.
          </p>
        </Card>
        <Card className="border border-border/70 bg-white/90 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Annual baseline cost
          </p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            {formatter.format(results.annualCost)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Current annual compliance effort across selected systems.
          </p>
        </Card>
        <Card className="border border-border/70 bg-white/90 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Time saved
          </p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            {results.timeSavedWeeks} weeks
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Potential reduction in audit preparation time.
          </p>
        </Card>
      </div>
    </div>
  );
}
