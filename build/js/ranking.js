const displayRanking = ({ el }) => {
  const ranking = window.localStorage.getItem("ranking");
  if (ranking) {
    el.innerHTML = "";
    const users = JSON.parse(window.localStorage.getItem("ranking"));
    el.insertAdjacentHTML("beforeend", `<ul id="list-rank"></ul>`);
    const list = document.getElementById("list-rank");
    users.map((usr, index) => {
      const item = `<li class="item-ranking">
        <span class="u-p">#${index + 1} ${usr.name}</span>
        <span class="u-p">${usr.level}</span>
      </li>`;
      list.insertAdjacentHTML("beforeend", item);
    });
  } else {
    el.innerHTML = "";
    const nonRanking = `<p class="u-p text-center">No records found, be the first 🎉 </p>`;
    el.insertAdjacentHTML("beforeend", nonRanking);
  }
};

const updateRanking = user => {
  const ranking = Boolean(window.localStorage.getItem("ranking"));
  if (ranking) {
    const users = JSON.parse(window.localStorage.getItem("ranking"));
    users.push(user);
    window.localStorage.setItem("ranking", JSON.stringify(reorder(users)));
  } else {
    window.localStorage.setItem("ranking", JSON.stringify([user]));
  }
};

const reorder = users => {
  return users.sort(function (a, b) {
    if (a.level < b.level) {
      return 1;
    }
    if (a.level > b.level) {
      return -1;
    }
  });
};

export { displayRanking, updateRanking };
