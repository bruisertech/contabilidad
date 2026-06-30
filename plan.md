1. **Understand the requirements:**
   - Evolve the advanced tax simulator (`Simulator.jsx`).
   - Add options for "Account 1", "Account 2" etc., dynamically based on the selected profile (Client 1, Client 2 for accountants, Company 1, Company 2 for businesses).
   - Change the color of the "Dinero en Cuentas" (Bank Accounts) slice in the pie chart from gray (`#1E293B`) to a pastel red (e.g., `#FF6B6B`) so it's more visible.
2. **Modify `Simulator.jsx`:**
   - Add state for bank accounts as an array of objects to allow multiple accounts.
   - Implement add/remove/update functions for bank accounts (similar to incomes).
   - Dynamically change labels (e.g., "Cuenta Bancaria" vs "Cliente / Empresa") based on the `activeProfile`. If profile is 'contador', accounts could be labeled 'Cliente' or 'Empresa'.
   - Update the chart data logic to sum the new bank accounts array and use `#FF6B6B` instead of `#1E293B` for its color.
3. **Verify:** Check UI layout for the new dynamic inputs.
4. **Pre-commit and Submit:** Run pre-commit instructions, then submit.
