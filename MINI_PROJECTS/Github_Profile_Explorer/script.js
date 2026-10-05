const usernameInput = document.getElementById("username");

const searchBtn = document.getElementById("searchBtn");

const profile = document.getElementById("profile");

const repositories = document.getElementById("repositories");

searchBtn.addEventListener("click", function () {
  const username = usernameInput.value;

  if (username === "") {
    alert("Please enter a username");
    return;
  }

  getProfile(username);
});

async function getProfile(username) {
  try {
    const url = `https://api.github.com/users/${username}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    profile.innerHTML = `
            <div class="profile">

                <img src="${data.avatar_url}">

                <div>

                    <h2>${data.name || data.login}</h2>

                    <p>Username: ${data.login}</p>

                    <p>${data.bio || "No bio available"}</p>

                    <p>Followers: ${data.followers}</p>

                    <p>Following: ${data.following}</p>

                    <p>Repositories: ${data.public_repos}</p>

                </div>

            </div>
        `;

    const repoUrl = `https://api.github.com/users/${username}/repos`;

    const repoResponse = await fetch(repoUrl);

    const repoData = await repoResponse.json();

    repositories.innerHTML = "<h2>Repositories</h2>";

    repoData.forEach(function (repo) {
      repositories.innerHTML += `
                <div class="repo">

                    <h3>${repo.name}</h3>

                    <p>
                        ${repo.description || "No description"}
                    </p>

                    <p>
                        Language: ${repo.language || "Not specified"}
                    </p>

                    <a 
                        href="${repo.html_url}" 
                        target="_blank"
                    >
                        View Repository
                    </a>

                </div>
            `;
    });
  } catch (error) {
    profile.innerHTML = `
            <p>${error.message}</p>
        `;

    repositories.innerHTML = "";
  }
}
