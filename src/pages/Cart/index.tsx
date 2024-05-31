export default function Cart() {
  const cartItem = localStorage.getItem('ids')
  return (
    <div class='grid grid-cols-1'>
      {cartItem}
    </div>
  ) 
}
