// // src/components/TradeForm.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addTrade } from '~/features/trades/tradeSlice';
// import { TradeType } from '~/types/TradeType';

// const AddTradeForm = () => {
//   const dispatch = useDispatch();
//   const [sum, setSum] = useState('');
//   const [comment, setComment] = useState('');
//   const [type, setType] = useState(TradeType.EXPENSE); 

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const newTrade = {
//       id: Date.now(), 
//       sum: parseInt(sum, 10),
//       comment,
//       type,
//     };

//     dispatch(addTrade(newTrade));  // Добавляем сделку в Redux
//     setSum('');
//     setComment('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Сумма:
//         <input
//           type="number"
//           value={sum}
//           onChange={(e) => setSum(e.target.value)}
//           required
//         />
//       </label>
//       <br />
//       <label>
//         Комментарий:
//         <input
//           type="text"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Тип:
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value={TradeType.EXPENSE}>Расход</option>
//           <option value={TradeType.INCOME}>Доход</option>
//         </select>
//       </label>
//       <br />
//       <button type="submit">Добавить сделку</button>
//     </form>
//   );
// };

// export default AddTradeForm;
