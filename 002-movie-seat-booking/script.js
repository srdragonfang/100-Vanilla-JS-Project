const seats = document.querySelectorAll(".seat:not(.occupied)");
const dbseats = document.querySelectorAll(".dbseat:not(.occupied)");
const occupieds = document.querySelectorAll(".seat.occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const movieTrailer = document.querySelector(".movie-trailer");

let ticketPrice = +movieSelect.value;

populateUI();
// console.log(ticketPrice);
loadSeats();
loadTrailer(+movieSelect.value);
function loadSeats() {
  seats.forEach((seat) => {
    seat.addEventListener("click", (e) => {
      seat.classList.toggle("selected");
      selectedCount();
    });
  });
  dbseats.forEach((dbseat) => {
    dbseat.addEventListener("click", (e) => {
      dbseat.classList.toggle("selected");
      selectedCount();
    });
  });
}

function selectedCount() {
  const seatSelecteds = document.querySelectorAll(".row .seat.selected");
  const dbseatSelecteds = document.querySelectorAll(".row .dbseat.selected");
  // seatSelecteds -> khong the khai bao ben ngoai ham selectedCount
  // boi vi no se khong thay doi hay reset lai gia tri/so dem khi ham loadSeats thuc hien.
  const seatsIndex = [...seatSelecteds].map((seat) => {
    [...seats].indexOf(seat);
    console.log([...seats].indexOf(seat));
  });
  const dbseatsIndex = [...dbseatSelecteds].map((dbseat) => {
    [...dbseats].indexOf(dbseat);
  });
  localStorage.setItem(
    "seatSelecteds3",
    JSON.stringify(seatsIndex, dbseatsIndex)
  );

  const formatCount = function (count) {
    return count < 10 ? `0${count}` : count;
  };
  count.innerText = formatCount(seatSelecteds.length + dbseatSelecteds.length);

  total.innerText =
    seatSelecteds.length * ticketPrice +
    dbseatSelecteds.length * ((ticketPrice * 2 * (100 + 5)) / 100);
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

function loadTrailer(index) {
  if (index == 19) {
    movieTrailer.src = "https://www.youtube.com/embed/Wg86eQkdudI";
  }
  if (index == 21) {
    movieTrailer.src = "https://www.youtube.com/embed/V75dMMIW2B4";
  }
  if (index == 17) {
    movieTrailer.src = "https://www.youtube.com/embed/8g18jFHCLXk";
  }
  if (index == 15) {
    movieTrailer.src = "https://www.youtube.com/embed/TfyunOnMGqM";
  }
  // if (movieSelect[3].dataset.idx == 4) {
  //   movieTrailer.innerHTML =
  // }
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = e.target.value;
  loadTrailer(+movieSelect.value);
  selectedCount();
});
