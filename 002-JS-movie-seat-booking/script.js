// ! task:
// 1. thuc hien su kien khi click vao seat
// 2. dem so seat khi thuc hien event select
// 3. tinh tong so tien phai tra dua vao gia ve phim
// 4. thay doi gia tien ve xem phim

const seats = document.querySelectorAll(".seat:not(.occupied)");
const occupieds = document.querySelectorAll(".seat.occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;
console.log(ticketPrice);
loadSeats();
function loadSeats() {
  seats.forEach((seat) => {
    seat.addEventListener("click", (e) => {
      seat.classList.toggle("selected");
      selectedCount();
    });
  });
}
function selectedCount() {
  const seatSelecteds = document.querySelectorAll(".row .selected");
  // seatSelecteds -> khong the khai bao ben ngoai ham selectedCount
  // boi vi no se khong thay doi hay reset lai gia tri/so dem khi ham loadSeats thuc hien.
  count.innerText = seatSelecteds.length;
  total.innerText = seatSelecteds.length * ticketPrice;
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = e.target.value;
  selectedCount();
});
