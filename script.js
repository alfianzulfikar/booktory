// initial ajax to populate books data
let xmlhttp = new XMLHttpRequest();
let url = "books.json";

xmlhttp.onload = async function () {
  let books = await JSON.parse(this.responseText);
  let slideHtml = "";
  let descHtml = "";
  let booksIndex = 0;
  let classIndex = 0;

  for (i = 0; i < books.length; i++) {
    if (i === books.length - 1) {
      classIndex = "last";
    } else {
      classIndex = i + 1;
    }
    booksIndex = i;

    slideHtml += `<img src="./assets/images/${books[booksIndex].image}" class="book-${classIndex} book" alt="book-${classIndex}" onclick="changeSlideDesc(${booksIndex})"/>`;

    descHtml = `<p class="book-title"><strong>${books[0].title}</strong></p>
    <p class="book-desc">${books[0].author}</p>`;

    document.getElementById("slide").innerHTML = slideHtml;
    document.getElementById("desc").innerHTML = descHtml;
    slide(); // define event listener of slider
  }
};
xmlhttp.open("GET", url);
xmlhttp.send();

function slide() {
  let books = document.querySelectorAll(".book");
  console.log[books];
  for (let i = 0; i < books.length; i++) {
    books[i].addEventListener("click", function () {
      let book = [];
      for (let j = 0; j < books.length; j++) {
        if (j === books.length - 1) {
          book[j] = document.querySelector(`.book-last`);
        } else {
          book[j] = document.querySelector(`.book-${j + 1}`);
        }
      }

      if (window.innerWidth > 768) {
        if (books[i].classList.contains("book-2")) {
          for (let j = 0; j < books.length; j++) {
            if (j === 0) {
              book[j].classList.add(`book-last`);
              book[j].classList.remove("book-1");
            } else if (j === books.length - 1) {
              book[j].classList.add(`book-${j}`);
              book[j].classList.remove(`book-last`);
            } else {
              book[j].classList.add(`book-${j}`);
              book[j].classList.remove(`book-${j + 1}`);
            }
          }
        } else if (books[i].classList.contains(`book-last`)) {
          for (let j = 0; j < books.length; j++) {
            if (j === books.length - 1) {
              book[j].classList.add("book-1");
              book[j].classList.remove(`book-last`);
            } else if (j === books.length - 2) {
              book[j].classList.add("book-last");
              book[j].classList.remove(`book-${books.length - 1}`);
            } else {
              book[j].classList.add(`book-${j + 2}`);
              book[j].classList.remove(`book-${j + 1}`);
            }
          }
        }
      } else {
        for (let j = 0; j < books.length; j++) {
          if (j === 0) {
            book[j].classList.add(`book-last`);
            book[j].classList.remove("book-1");
          } else if (j === books.length - 1) {
            book[j].classList.add(`book-${j}`);
            book[j].classList.remove("book-last");
          } else {
            book[j].classList.add(`book-${j}`);
            book[j].classList.remove(`book-${j + 1}`);
          }
        }
      }
    });
  }
}

function changeSlideDesc(id) {
  let xmlhttp = new XMLHttpRequest();
  let url = "books.json";

  xmlhttp.onreadystatechange = async function () {
    if (this.readyState == 4 && this.status == 200) {
      let books = await JSON.parse(this.responseText);
      let nextBookId = 0;

      if (window.innerWidth > 768) {
        nextBookId = id;
      } else {
        if (id === books.length - 1) {
          nextBookId = 0;
        } else {
          nextBookId = id + 1;
        }
      }

      descHtml = `<p class="book-title"><strong>${books[nextBookId].title}</strong></p>
    <p class="book-desc">${books[nextBookId].author}</p>`;
      document.getElementById("desc").innerHTML = descHtml;
    }
  };
  xmlhttp.open("GET", url);
  xmlhttp.send();
}

function mobileCategoryToggle() {
  let mobileCategory = document.getElementById("mobile-category");
  if (mobileCategory.classList.contains("show")) {
    mobileCategory.style.left = "-100%";
    mobileCategory.classList.remove("show");
  } else {
    mobileCategory.style.left = "0";
    mobileCategory.classList.add("show");
  }
}
