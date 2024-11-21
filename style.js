var modal = document.getElementById("myModal");

var toggleButton = document.getElementById("toggleButton");
var payButton = document.getElementById("payButton");
var span = document.getElementsByClassName("close")[0];
var form = document.getElementById("nameForm");
var namaDisplay = document.getElementById("namaDisplay");
var jenisDisplay = document.getElementById("jenisDisplay");
var timeDisplay = document.getElementById("timeDisplay");
var priceDisplay = document.getElementById("priceDisplay");
var countdownInterval;
var isRunning = false;

var toggleButton2 = document.getElementById("toggleButton2");
var payButton2 = document.getElementById("payButton2");
var namaDisplay2 = document.getElementById("namaDisplay2");
var jenisDisplay2 = document.getElementById("jenisDisplay2");
var timeDisplay2 = document.getElementById("timeDisplay2");
var priceDisplay2 = document.getElementById("priceDisplay2");
var countdownInterval2;
var isRunning2 = false; // Track if the timer for Meja 02 is running

var paymentModal = document.getElementById("paymentModal");
var paymentDetails = document.getElementById("paymentDetails");
var closePaymentModal = document.getElementsByClassName("closePaymentModal")[0];
var confirmPaymentButton = document.getElementById("confirmPaymentButton");

toggleButton.onclick = function () {
  if (!isRunning) {
    modal.classList.remove("hidden");
    currentCard = 1;
  } else {
    stopCountdown();
  }
};

toggleButton2.onclick = function () {
  if (!isRunning2) {
    modal.classList.remove("hidden");
    currentCard = 2; // Track which card is active
  } else {
    stopCountdown2(); // Stop the countdown if already running
  }
};

payButton.onclick = function () {
  var meja = "01";
  var name = namaDisplay.textContent.split(": ")[1];
  var price = priceDisplay.textContent.split(": Rp ")[1];

  paymentDetails.innerHTML = `Meja: ${meja}<br>Nama: ${name}<br>Harga: Rp ${price}`;
  paymentModal.classList.remove("hidden");
};

payButton2.onclick = function () {
  var meja = "02";
  var name = namaDisplay2.textContent.split(": ")[1];
  var price = priceDisplay2.textContent.split(": Rp ")[1];

  paymentDetails.innerHTML = `Meja: ${meja}<br>Nama: ${name}<br>Harga: Rp ${price}`;
  paymentModal.classList.remove("hidden");
};

span.onclick = function () {
  modal.classList.add("hidden");
  clearInterval(countdownInterval);
  isRunning = false;
  toggleButton.textContent = "Nyalakan";
  payButton.classList.add("hidden");
  resetForm(); // Reset form fields
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.add("hidden");
    clearInterval(countdownInterval);
    isRunning = false;
    toggleButton.textContent = "Nyalakan";
    payButton.classList.add("hidden");
    resetForm();
  }
};

closePaymentModal.onclick = function () {
  paymentModal.classList.add("hidden");
};

window.onclick = function (event) {
  if (event.target == paymentModal) {
    paymentModal.classList.add("hidden");
  }
};

form.onsubmit = function (event) {
  if (currentCard === 1) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var jenis = document.getElementById("jenisSelect").value;
    var rate = parseInt(jenis.split(": ")[1]);
    var selectedTime = parseInt(document.getElementById("timeSelect").value);

    var hours = selectedTime / 3600;
    var price = rate * hours;

    namaDisplay.textContent = `Nama : ${name}`;
    jenisDisplay.textContent = `Jenis : ${jenis}`;
    timeDisplay.textContent = `Waktu : ${("0" + hours).slice(-2)}:00:00`;
    priceDisplay.textContent = `Harga : Rp ${price}`;

    startCountdown(selectedTime);
    modal.classList.add("hidden");
    isRunning = true;
    toggleButton.textContent = "Hentikan";
    payButton.classList.remove("hidden");
  } else if (currentCard === 2) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var jenis = document.getElementById("jenisSelect").value;
    var rate = parseInt(jenis.split(": ")[1]);
    var selectedTime = parseInt(document.getElementById("timeSelect").value);

    // Calculate price
    var hours = selectedTime / 3600;
    var price = rate * hours;

    namaDisplay2.textContent = `Nama : ${name}`;
    jenisDisplay2.textContent = `Jenis : ${jenis}`;
    timeDisplay2.textContent = `Waktu : ${("0" + hours).slice(-2)}:00:00`;
    priceDisplay2.textContent = `Harga : Rp ${price}`;

    startCountdown2(selectedTime);
    modal.classList.add("hidden");
    isRunning2 = true;
    toggleButton2.textContent = "Hentikan";
    payButton2.classList.remove("hidden");
  }
};

confirmPaymentButton.onclick = function () {
  alert("Pembayaran telah dikonfirmasi !");
  paymentModal.classList.add("hidden");
};

function startCountdown(duration) {
  var timer = duration,
    hours,
    minutes,
    seconds;

  countdownInterval = setInterval(function () {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt(timer % 60, 10);

    timeDisplay.textContent = `Waktu : ${("0" + hours).slice(-2)}:${(
      "0" + minutes
    ).slice(-2)}:${("0" + seconds).slice(-2)}`;

    if (--timer < 0) {
      clearInterval(countdownInterval);
      timeDisplay.textContent = "Waktu : 00:00:00";
    }
  }, 1000);
}

function startCountdown2(duration) {
  var timer = duration,
    hours,
    minutes,
    seconds;

  countdownInterval2 = setInterval(function () {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt(timer % 60, 10);

    timeDisplay2.textContent = `Waktu : ${("0" + hours).slice(-2)}:${(
      "0" + minutes
    ).slice(-2)}:${("0" + seconds).slice(-2)}`;

    if (--timer < 0) {
      clearInterval(countdownInterval2);
      timeDisplay2.textContent = "Waktu : 00:00:00";
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(countdownInterval);
  isRunning = false;
  toggleButton.textContent = "Nyalakan";
  payButton.classList.add("hidden");
  restValues();
}

function restValues() {
  namaDisplay.textContent = "Nama :";
  jenisDisplay.textContent = "Jenis :";
  timeDisplay.textContent = "Waktu : 00:00:00";
  priceDisplay.textContent = "Harga : Rp 0";
}

function stopCountdown2() {
  clearInterval(countdownInterval2);
  isRunning2 = false;
  toggleButton2.textContent = "Nyalakan";
  payButton2.classList.add("hidden");
  resetValues2(); // Reset displayed values for Meja 02
}

function resetValues2() {
  namaDisplay2.textContent = "Nama :";
  jenisDisplay2.textContent = "Jenis :";
  timeDisplay2.textContent = "Waktu : 00:00:00";
  priceDisplay2.textContent = "Harga : Rp 0";
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("timeSelect").selectedIndex = 0;
  document.getElementById("jenisSelect").selectedIndex = 0;
}
