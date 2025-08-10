import React, { useState, useMemo } from 'react';

interface Entry {
  id: string;
  type: 'income' | 'expense';
  label: string;
  amount: number;
  category: string;
}

  const categories = {
    income: ['Pensja', 'Zlecenia', 'Inwestycje', 'Inne'],
    expense: ['Mieszkanie', 'Jedzenie', 'Transport', 'Rozrywka', 'Zdrowie', 'Inne']
  } as const;
  type IncomeCategory = typeof categories.income[number];
  type ExpenseCategory = typeof categories.expense[number];
  type AnyCategory = IncomeCategory | ExpenseCategory;

const currencyFormat = (value: number) =>
  value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });

export const BudgetPlanner: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<AnyCategory>(categories.income[0]);
  const [filterCat, setFilterCat] = useState<string>('');

  const addEntry = () => {
    const value = parseFloat(amount.replace(',', '.'));
    if (!label.trim() || isNaN(value) || value <= 0) return;
    const entry: Entry = {
      id: crypto.randomUUID(),
      type,
      label: label.trim(),
      amount: value,
      category
    };
    setEntries(prev => [entry, ...prev]);
    setLabel('');
    setAmount('');
  };

  const removeEntry = (id: string) => setEntries(prev => prev.filter(e => e.id !== id));

  const summary = useMemo(() => {
    const income = entries.filter(e => e.type === 'income').reduce((s, e) => s + e.amount, 0);
    const expense = entries.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0);
    return { income, expense, balance: income - expense };
  }, [entries]);

  const filtered = useMemo(() => {
    return filterCat
      ? entries.filter(e => e.category === filterCat)
      : entries;
  }, [entries, filterCat]);

  const expensePct = summary.income ? Math.min(100, (summary.expense / summary.income) * 100) : 0;

  return (
    <div className="planner">
      <h2 className="planner__title">Budżet</h2>
      <div className="planner__summary">
        <div><span>Przychody:</span><strong>{currencyFormat(summary.income)}</strong></div>
        <div><span>Wydatki:</span><strong>{currencyFormat(summary.expense)}</strong></div>
        <div className={`balance ${summary.balance < 0 ? 'neg' : 'pos'}`}>
          <span>Bilans:</span><strong>{currencyFormat(summary.balance)}</strong>
        </div>
        <div className="progress-wrap">
          <div className="progress-bar">
            <div className="progress-bar__fill" style={{ width: `${expensePct}%` }} />
          </div>
          <small>{expensePct.toFixed(0)}% dochodu wydane</small>
        </div>
      </div>

      <div className="planner__form" onSubmit={e => e.preventDefault()}>
        <div className="type-switch" role="radiogroup" aria-label="Typ pozycji">
          <button
            type="button"
            className={type === 'income' ? 'active' : ''}
            onClick={() => { setType('income'); setCategory(categories.income[0]); }}
          >+ Przychód</button>
          <button
            type="button"
            className={type === 'expense' ? 'active' : ''}
            onClick={() => { setType('expense'); setCategory(categories.expense[0]); }}
          >- Wydatek</button>
        </div>
        <div className="row">
          <div className="field">
            <label htmlFor="bp-label">Opis</label>
            <input
              id="bp-label"
              placeholder="np. Zakupy spożywcze"
              value={label}
              onChange={e => setLabel(e.target.value)}
              aria-describedby="bp-label-help"
            />
          </div>
          <div className="field">
            <label htmlFor="bp-amount">Kwota</label>
            <input
              id="bp-amount"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value.replace(/,/g, '.'))}
              inputMode="decimal"
              aria-describedby="bp-amount-help"
            />
          </div>
        </div>
        <div className="row">
          <div className="field">
            <label htmlFor="bp-category">Kategoria</label>
            <select id="bp-category" value={category} onChange={e => setCategory(e.target.value as AnyCategory)}>
              {categories[type].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
            <button type="button" className="add-btn" style={{ alignSelf: 'flex-end' }} onClick={addEntry}>Dodaj</button>
        </div>
      </div>

      <div className="filter">
        <div className="field" style={{ flex: 1 }}>
          <label htmlFor="bp-filter">Filtr kategorii</label>
          <select id="bp-filter" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
            <option value="">Wszystkie kategorie</option>
            {[...new Set(entries.map(e => e.category))].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        {filterCat && <button className="clear-filter" onClick={() => setFilterCat('')}>Wyczyść</button>}
      </div>

      <ul className="entries" aria-live="polite">
        {filtered.length === 0 && <li className="empty">Brak pozycji</li>}
        {filtered.map(e => (
          <li key={e.id} className={e.type}>
            <div className="meta">
              <strong>{e.label}</strong>
              <span className="category">{e.category}</span>
            </div>
            <span className="amount">{e.type === 'expense' ? '-' : '+'}{currencyFormat(e.amount)}</span>
            <button className="remove" aria-label="Usuń" onClick={() => removeEntry(e.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetPlanner;
