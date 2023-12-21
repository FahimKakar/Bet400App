import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  balance: 1000,
  error: null, // Add an error field to the state to handle errors
};

export const betSlice = createSlice({
  name: 'bet',
  initialState,
  reducers: {
    placebet: (state, action) => {
      const betAmount = action.payload;
       console.log('placebet action payload:', betAmount);
      if (!isNaN(betAmount) && betAmount > 0) {
        if (state.balance >= betAmount) {
          state.value = betAmount;
          state.balance -= betAmount;
          state.error = null; // Reset error on successful bet
        } else {
          // Handle insufficient balance
          state.error = 'Insufficient balance for this bet.';
        }
      } else {
        // Handle invalid bet amount
        state.error = 'Invalid bet amount.';
      }
    },
    odds: (state, action) => {
      state.value *= parseFloat(action.payload);
      state.balance += state.value;
    },
    deposit: (state, action) => {
      state.balance += action.payload; // Deposit amount
    },
    withdraw: (state, action) => {
      if(state.balance >= action.payload){
        state.balance -= action.payload; // Withdraw amount
      }
    }
  },
});

export const { placebet, odds, deposit, withdraw } = betSlice.actions;

export default betSlice.reducer;
