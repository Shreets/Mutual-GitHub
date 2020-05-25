const runAll = () => {
  //       //setting variable for local storage
  var tokenVal = localStorage.getItem("tokenInput");

  //dialog box
  var d = document.createElement("dialog");
  d.className = "dialogContainer";
  d.innerHTML = `
      <div class="close">Close</div>
      <div class="container">      
      </div>
      `;
  if (
    document.querySelector(
      "#js-pjax-container > div > div.h-card.col-lg-3.col-md-4.col-12.float-md-left.pr-md-3.pr-xl-6"
    )
  ) {
    document
      .querySelector(
        "#js-pjax-container > div > div.h-card.col-lg-3.col-md-4.col-12.float-md-left.pr-md-3.pr-xl-6"
      )
      .appendChild(d);
  }

  var c = document.createElement("container");
  c.className = "container";
  c.innerHTML = `<div></div>`;
  if (document.querySelector(".dialogContainer")) {
    document.querySelector(".dialogContainer").appendChild(c);
  }

  d.style.display = "none";

  //addition of input field for token if token is not already saved in local storage
  var inp = document.createElement("inp");
  inp.className = "form-submit";
  inp.innerHTML = `<form class="form-submit">
      <input id="token-text" type="text" placeholder="  Token Here" />
        <button id="submit">Submit</button>
      </form>`;
  if (
    document.querySelector(
      "#js-pjax-container > div > div.h-card.col-lg-3.col-md-4.col-12.float-md-left.pr-md-3.pr-xl-6 > div.clearfix > div.vcard-names-container.float-left.col-9.col-md-12.pt-1.pt-md-3.pb-1.pb-md-3.js-sticky.js-user-profile-sticky-fields"
    )
  ) {
    document
      .querySelector(
        "#js-pjax-container > div > div.h-card.col-lg-3.col-md-4.col-12.float-md-left.pr-md-3.pr-xl-6 > div.clearfix > div.vcard-names-container.float-left.col-9.col-md-12.pt-1.pt-md-3.pb-1.pb-md-3.js-sticky.js-user-profile-sticky-fields"
      )
      .appendChild(inp);
  }

  //addition of input field for token if token is not already saved in local storage
  var link = document.createElement("links");
  link.className = "link";
  link.innerHTML = `<span> Check Mutual List</span>`;

  //declaring span to display mutual following

  var e = document.createElement("e");
  e.className = "name-list";
  e.innerHTML = `<span class="name-list"></span>`;
  if (
    document.querySelector(
      "#js-pjax-container > div > div.h-card.col-lg-3.col-md-4.col-12.float-md-left.pr-md-3.pr-xl-6 > div.clearfix > div.vcard-names-container.float-left.col-9.col-md-12.pt-1.pt-md-3.pb-1.pb-md-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block"
    )
  ) {
    var thirdParty = document.querySelector(
      "#js-pjax-container > div > div.h-card.col-lg-3.col-md-4.col-12.float-md-left.pr-md-3.pr-xl-6 > div.clearfix > div.vcard-names-container.float-left.col-9.col-md-12.pt-1.pt-md-3.pb-1.pb-md-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block"
    ).innerHTML;
  }
  var mutualSpan = document.querySelector(".form-submit");
  var sub = document.getElementById("submit");
  var input = document.getElementById("token-text");
  var form = document.querySelector(".form-submit");
  if (mutualSpan) {
    mutualSpan.style.display = "none";
  }
  if (form) {
    form.style.display = "none";
  }

  //checking if token if present in local storage
  //if not the token needs to be submitted via input to display mutual following span

  if (tokenVal === "" || tokenVal === "undefined" || tokenVal === null) {
    mutualSpan.style.display = "none";
    form.style.display = "block";
    if (sub) {
      sub.addEventListener("click", (event) => {
        event.preventDefault();
        if (input) {
          event.preventDefault();
          t = document.getElementById("token-text").value;
          localStorage.setItem("tokenInput", t);
          tokenVal = localStorage.getItem("tokenInput");
          inp.innerHTML = "";
          getPrivate();
        }
      });
    }
  } else {
    getPrivate();
  }

  //accesses current users account and passes git-api url for users' following-list
  async function getPrivate() {
    const header = {
      Authorization: `Token ${tokenVal}`,
    };
    const url = `https://api.github.com/user`;
    const response = await fetch(url, {
      method: "GET",
      headers: header,
    });
    const result = await response.json();
    var r = result.following_url;
    var user = result.login;
    r = r.substring(0, r.indexOf("{"));
    if (thirdParty && thirdParty !== user) {
      document
        .querySelector(
          "#js-pjax-container > div > div.h-card.col-lg-3.col-md-4.col-12.float-md-left.pr-md-3.pr-xl-6 > div.clearfix > div.vcard-names-container.float-left.col-9.col-md-12.pt-1.pt-md-3.pb-1.pb-md-3.js-sticky.js-user-profile-sticky-fields"
        )
        .appendChild(link);
      //displaying option to view mutual list
      if (
        document
          .querySelector(
            "#js-pjax-container > div > div.h-card.col-lg-3.col-md-4.col-12.float-md-left.pr-md-3.pr-xl-6 > div.clearfix > div.vcard-names-container.float-left.col-9.col-md-12.pt-1.pt-md-3.pb-1.pb-md-3.js-sticky.js-user-profile-sticky-fields"
          )
          .appendChild(link)
      ) {
        document.querySelector(".link").addEventListener("click", (event) => {
          event.preventDefault();
          link.innerHTML = "";
          document
            .querySelector(
              "#js-pjax-container > div > div.h-card.col-lg-3.col-md-4.col-12.float-md-left.pr-md-3.pr-xl-6 > div.clearfix > div.vcard-names-container.float-left.col-9.col-md-12.pt-1.pt-md-3.pb-1.pb-md-3.js-sticky.js-user-profile-sticky-fields"
            )
            .appendChild(e);
          getFollowing(r);
        });
      }
    } else {
      link.innerHTML = "";
    }
  }

  //uses git-api url to fetch users' following-list
  async function getFollowing(url) {
    var header = {
      Authorization: `Token ${tokenVal}`,
    };
    var FollowingPromises = [];
    var following = [];
    const r = url.concat("?per_page=100&type=owner&page=1");
    const response = await fetch(r, {
      method: "GET",
      headers: header,
    });
    const link = response.headers.get("link");
    if (link) {
      var last = parseInt(link.substr(-14, 1));

      async function fetchData(url) {
        const res = await fetch(url, {
          method: "GET",
          headers: header,
        });
        const result = await res.json();
        return result;
      }

      for (let i = 1; i <= last; i++) {
        const resp = fetchData(
          url.concat(`?per_page=100&type=owner&page=${i}`)
        );
        FollowingPromises.push(resp);
      }
      var allFollowing = await Promise.all(FollowingPromises.flat(Infinity));

      following = allFollowing.flat(Infinity).map((i) => ({
        name: i.login,
        profile: i.html_url,
      }));
    } else {
      const result = await response.json();
      following = result.map((i) => ({
        name: i.login,
        profile: i.html_url,
      }));
    }

    getThirdParty(following);
  }
  //fetches follower-list of third person's profile
  async function getThirdParty(following) {
    var header = {
      Authorization: `Token ${tokenVal}`,
    };
    var userFollowing = following;
    var followerPromises = [];
    var thirdPartyfollowers;
    const response = await fetch(
      `https://api.github.com/users/${thirdParty}/followers?per_page=100&type=owner&page=1`,
      {
        method: "GET",
        headers: header,
      }
    );
    const link = response.headers.get("link");
    if (link) {
      var x = link
        .replace("&page=", " ")
        .replace("&page=", " ")
        .replace(">;", "")
        .replace(">;", "")
        .split(" ");
      var last = parseInt(x[x.length - 2]);
      async function fetchFollowData(url) {
        const res = await fetch(url, {
          method: "GET",
          headers: header,
        });
        const result = await res.json();
        return result;
      }
      for (let i = 1; i <= last; i++) {
        const res = fetchFollowData(
          `https://api.github.com/users/${thirdParty}/followers?per_page=100&type=owner&page=${i}`
        );
        followerPromises.push(res);
      }

      var allFollower = await Promise.all(followerPromises.flat(Infinity));

      thirdPartyfollowers = allFollower.flat(Infinity).map((i) => ({
        name: i.login,
        profile: i.html_url,
        avatar: i.avatar_url,
      }));
    } else {
      const result = await response.json();
      thirdPartyfollowers = result.map((i) => ({
        name: i.login,
        profile: i.html_url,
        avatar: i.avatar_url,
      }));
    }

    getMutual(userFollowing, thirdPartyfollowers);
  }

  //checks for mutual connections and displays
  function getMutual(userFollowing, thirdPartyfollowers) {
    var mutualList = [];
    var listProfile = [];
    var listAvatar = [];
    for (let i = 0; i < userFollowing.length; i++) {
      for (let j = 0; j < thirdPartyfollowers.length; j++) {
        if (userFollowing[i].name === thirdPartyfollowers[j].name) {
          mutualList.push(thirdPartyfollowers[j].name);
          listProfile.push(thirdPartyfollowers[j].profile);
          listAvatar.push(thirdPartyfollowers[j].avatar);

          e.innerHTML = `<span class="name-list">Followed by ${
            thirdPartyfollowers[j].name
          } ${
            mutualList.length - 1 === 0
              ? ``
              : mutualList.length - 1 === 1
              ? `and ` + (mutualList.length - 1) + ` other you follow`
              : `and ` + (mutualList.length - 1) + ` others you follow`
          } </span>`;
        }
      }
    }
    if (mutualList.length === 0) {
      e.innerHTML = `<span class="name-list">Followed by none others you follow</span> `;
    }
    displayDialog(mutualList, listProfile, listAvatar);
  }

  function displayDialog(mutualList, listProfile, listAvatar) {
    for (let i = 0; i < mutualList.length; i++) {
      var con = document.createElement("content-card");
      con.className = "content-card";
      con.innerHTML = `
                <span class="image"><img src=${listAvatar[i]}/></span>
                <span class="username"><a href=${listProfile[i]} target="_blank">${mutualList[i]}</a></span>`;
      document.querySelector(".container").appendChild(con);
    }

    var mutualLink = document.querySelector(".name-list");
    var close = document.querySelector(".close");
    if (mutualLink && mutualList.length !== 0) {
      mutualLink.addEventListener("click", (event) => {
        event.preventDefault();
        d.style.display = "block";
      });
    }
    close.addEventListener("click", () => {
      d.style.display = "none";
    });
  }
};
runAll();
document.addEventListener("pjax:end", runAll);
