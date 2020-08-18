// variables for the arrays
let usersData = [],
  usersAfterFilter = [];

// variables to implement user search
let usersDiv = null,
  inputUser = null,
  inputButton = null,
  inputValue = null,
  totalUsers = null;

// variables to do statistic
let sumFemales = null,
  sumMales = null,
  sumAges = null,
  averageAge = null,
  Sum = null;

window.addEventListener('load', () => {
  usersDiv = document.querySelector('#usersDiv');
  inputUser = document.querySelector('#inputUser');
  inputButton = document.querySelector('#inputButton');
  totalUsers = document.querySelector('#totalUsers');
  sumFemales = document.querySelector('#females');
  sumMales = document.querySelector('#males');
  sumAges = document.querySelector('#sum');
  averageAge = document.querySelector('#average');
  inputUser.focus();
  inputButton.disabled = true;
  doFetchAsyc();
  inputButton.addEventListener('click', doSearch);
  inputUser.addEventListener('keyup', KeyPressed);
});

async function doFetchAsyc() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();
  usersData = json.results.map((user) => {
    const { name, picture, dob, gender } = user;
    return {
      name: name.first + ' ' + name.last,
      picture: picture.medium,
      age: dob.age,
      gender,
    };
  });
  usersData.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  render(usersData);
}
function render(ArrayUsers) {
  showUsers(ArrayUsers);
  numberFemales(ArrayUsers);
  numberMales(ArrayUsers);
  doSum(ArrayUsers);
  doAverage(ArrayUsers);
}
function doSearch() {
  inputValue = inputUser.value;
  inputValue = inputValue.toUpperCase();
  const stringInBoth = usersData.filter((user) => {
    const name = user.name.toUpperCase();
    return name.indexOf(inputValue) !== -1;
  });
  render(stringInBoth);
}

function KeyPressed(event) {
  if (inputUser.value !== null) {
    inputButton.disabled = false;
  }
  if (event.keyCode === 13 && inputUser.value !== null) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    inputButton.click();
  }
}

function showUsers(dataToShow) {
  totalUsers.textContent = dataToShow.length;
  let usersHTML = '<div>';
  dataToShow.forEach((user) => {
    const { name, picture, age, gender } = user;
    const eachUserHTML = `
    <div>
      <img src="${picture}" class="image" alt="${name}" />
      <h6> ${name}, ${age} anos</h6>
    </div>
    `;
    usersHTML += eachUserHTML;
  });
  usersHTML += '</div>';
  usersDiv.innerHTML = usersHTML;
}
// console.log();
function numberFemales(ArrayUsers) {
  let females = ArrayUsers.filter((user) => {
    return user.gender === 'female';
  });
  sumFemales.textContent = females.length;
}
function numberMales(ArrayUsers) {
  let males = ArrayUsers.filter((user) => {
    return user.gender === 'male';
  });
  sumMales.textContent = males.length;
}
function doSum(ArrayUsers) {
  Sum = ArrayUsers.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);
  sumAges.textContent = Sum;
}
function doAverage(ArrayUsers) {
  averageAge.textContent = Sum / ArrayUsers.length;
}
