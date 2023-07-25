const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        remove: (state, action) => {
            const index = state.findIndex((item) => item.id === action.payload);
            if (index !== -1) {
              state.splice(index, 1);
            }
          }
    },
});

export const { add,remove } = cartSlice.actions;
export default cartSlice.reducer;
