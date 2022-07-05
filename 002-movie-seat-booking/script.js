// ! task:
// 1. [o] thuc hien su kien khi click vao seat
// 2. [o] dem so seat khi thuc hien event select
// 3. [o] tinh tong so tien phai tra dua vao gia ve phim
// 4. [o] thay doi gia tien ve xem phim
// 5. [x] set & get localStorage

const seats = document.querySelectorAll(".seat:not(.occupied)");
const occupieds = document.querySelectorAll(".seat.occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;
populateUI();
// console.log(ticketPrice);
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
  const seatsIndex = [...seatSelecteds].map((seat) => {
    [...seats].indexOf(seat);
  });
  localStorage.setItem("seatSelecteds3", JSON.stringify(seatsIndex));
  count.innerText = seatSelecteds.length;
  total.innerText = seatSelecteds.length * ticketPrice;
}
function populateUI() {
  const seatSelecteds = JSON.parse(localStorage.getItem("seatSelecteds3"));

  if (seatSelecteds !== null && seatSelecteds.length > 0) {
    seats.forEach((seat, index) => {
      if (seatSelecteds.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  } /* thêm class selected vào seat được select */
}
movieSelect.addEventListener("change", (e) => {
  ticketPrice = e.target.value;
  selectedCount();
});
