export default (state,discount) => {
    


    const CalcTotal = state.reduce((sum,item) => {
        return sum + item.dish.Price * item.quantity
    },0)


    const toPay = CalcTotal - ((discount*CalcTotal)/100*1.0);

    return {toPay};
}