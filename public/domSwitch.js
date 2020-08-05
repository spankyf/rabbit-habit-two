function myFunction() {
  console.log("something           ***");
  var x = document.getElementsByClassName("sleepForm");
  console.log(x);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
