let TheInput = document.querySelector(".repos-container input");
let GetButton = document.querySelector(".get-button");
let reposContainer = document.querySelector(".show-data ");

GetButton.onclick = function () {
  getrepos();
};
function getrepos() {
  if (TheInput.value === "") {
    reposContainer.innerHTML = "<span>Please write github username</span>";
  } else {
    fetch(`https://api.github.com/users/${TheInput.value}/repos`)
      .then((respond) => respond.json())
      .then((Repositories) => {
        reposContainer.innerHTML = "";
        Repositories.forEach(AddRepositoryToPage);
      });
  }
}
function AddRepositoryToPage(rep) {
  let mainDiv = document.createElement("div");
  let repoName = document.createTextNode(rep.name);
  mainDiv.appendChild(repoName);
  let starSpan = document.createElement("span");
  let strarsText = document.createTextNode(`Stars ${rep.stargazers_count}`);
  starSpan.appendChild(strarsText);
  mainDiv.appendChild(starSpan);
  let RepUrl = document.createElement("a");
  let TheUrlText = document.createTextNode("Visit");
  RepUrl.appendChild(TheUrlText);
  RepUrl.href = `https://github.com/${TheInput.value}/${rep.name}`;
  RepUrl.setAttribute("target", "_blank");
  mainDiv.appendChild(RepUrl);
  mainDiv.classList.add("repo-box");
  reposContainer.appendChild(mainDiv);
}
