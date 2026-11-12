/* Accrual model aligned with Dining-dollar-tracker computeStats/computeTodayTarget. */
window.BudgetModel = {
  stats(budget, today) {
    const iso = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const skip = new Set(budget.holidays || []), allDays = [];
    for (let d = new Date(`${budget.start}T12:00:00`); iso(d) <= budget.end; d.setDate(d.getDate() + 1)) {
      if (d.getDay() !== 0 && d.getDay() !== 6 && !skip.has(iso(d))) allDays.push(iso(d));
    }
    const days = budget.dayOverride ? allDays.slice(0, budget.dayOverride) : allDays;
    const elapsed = days.filter(d => d <= today).length, remaining = days.length - elapsed;
    const daily = days.length ? Math.max(0, budget.total - budget.reserve) / days.length : 0;
    const earned = daily * elapsed;
    const logged = budget.purchases.reduce((sum, p) => sum + p.amount, 0);
    const spent = Math.max(0, budget.total - budget.starting) + logged;
    const available = earned - spent, balance = budget.starting - logged;
    return {daily, earned, available, balance, elapsed, remaining, totalDays: days.length,
      todaySpent: budget.purchases.filter(p => p.date === today).reduce((sum, p) => sum + p.amount, 0),
      target: available > 0 ? available / Math.max(1, remaining + (days.includes(today) ? 1 : 0)) : null,
      projected: budget.total - (elapsed ? spent / elapsed : 0) * days.length};
  }
};
