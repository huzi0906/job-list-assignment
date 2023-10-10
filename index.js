let dataa;
let filter = [];

function filterJobs() {
  filteredJobs = dataa;
  if (!filter.includes($(this).text())) {
    filter.push($(this).text());
    $(".filterTab").empty();
    filter.map((f) => {
      const tt = $(`<span>${f}</span>`).addClass("taggg");
      $(".filterTab").append(tt);
    });

    // $(".filterTab").empty();
  }

  // } else {
  //   return;
  // }

  //const tag = $(this).text();

  console.log(filter);
  // let filteredJobs = dataa;

  filter.forEach((f) => {
    filteredJobs = filteredJobs.filter((job) => {
      if (
        job.role.includes(f) ||
        job.level.includes(f) ||
        job.languages.includes(f) ||
        job.tools.includes(f)
      ) {
        // console.log(true);
        return true;
      }
      // console.log(f + "false");
      return false;
    });
  });
  const stringg = $(this).parent(".taggs").text();

  $(".jobListings").empty();
  filteredJobs.forEach((job) => {
    createJobElement(job);
  });
}

function createJobElement(job) {
  const tags = [];
  const logo = $(`<img src="${job.logo}" alt="logo" />`).addClass("logo");
  const company = $(`<span>${job.company}</span>`).addClass("company");
  const newTag = job.new ? $(`<span>New!</span>`).addClass("new tag") : "";
  const featuredTag = job.featured
    ? $(`<span>Featured</span>`).addClass("featured tag")
    : "";
  const position = $(`<span>${job.position}</span>`).addClass("position");
  const role = $(`<span>${job.role}</span>`).addClass("tagg");
  tags.push(role);
  const level = $(`<span>${job.level}</span>`).addClass("tagg");
  tags.push(level);
  const postedAt = $(`<span>${job.postedAt}</span>`).addClass("subb");
  const contract = $(`<span>${job.contract}</span>`).addClass("subb");
  const location = $(`<span>${job.location}</span>`).addClass("subb");

  job.languages.map((languagee) => {
    const language = $(`<span>${languagee}</span>`).addClass("tagg");
    tags.push(language);
  });
  job.tools.map((tooll) => {
    const tool = $(`<span>${tooll}</span>`).addClass("tagg");
    tags.push(tool);
  });

  const alerts = $("<div></div>")
    .addClass("alerts")
    .append(newTag, featuredTag);

  const topps = $("<div></div>").addClass("topps").append(company, alerts);

  const subbs = $("<div></div>")
    .addClass("subbs")
    .append(
      postedAt,
      "<span> . </span>",
      contract,
      "<span> . </span>",
      location
    );

  const taggs = $("<div></div>").addClass("taggs").append(tags);

  const info = $("<div></div>").addClass("info").append(topps, position, subbs);

  const bin = $(`<img src="./images/bin.png" alt="bin" />`).addClass("bin");

  const div = $("<div></div>").addClass("job").append(logo, info, taggs, bin);

  $(".jobListings").append(div);

  $(".bin").click(function () {
    $(this).parent(".job").remove();
  });

  $(".tagg").click(filterJobs);

  $(".position").click(function () {
    console.log($(this).parent(".info").text());
  });
}

function Func() {
  fetch("/data.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      dataa = data;
      data.forEach((job) => {
        createJobElement(job);
      });
    });
}

$(".addJobButton").click(function () {
  $(".modalContainer").show();
});

$(".close").click(() => {
  $(".modalContainer").hide();
});

$(".clear").click(() => {
  console.log("clear");
  filter = [];
  $(".filterTab").empty();
  $(".jobListings").empty();
  dataa.forEach((job) => {
    createJobElement(job);
  });
});

Func();

const form = document.querySelector("form");

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

$("form").on("submit", function (e) {
  e.preventDefault();
  // });

  // $(".submit").click(() => {
  const company = document.querySelector("#company").value;
  const logo = document.querySelector("#logo").value;
  const position = document.querySelector("#position").value;
  const role = document.querySelector("#role").value;
  const level = document.querySelector("#level").value;
  const postedAt = document.querySelector("#postedAt").value;
  const contract = document.querySelector("#contract").value;
  const location = document.querySelector("#location").value;
  const languages = document.querySelector("#languages").value.split(",");
  const tools = document.querySelector("#tools").value.split(",");
  const featured = document.querySelector("#featured").checked;

  const newJob = {
    company: company,
    logo: logo,
    position: position,
    role: role,
    level: level,
    postedAt: postedAt,
    contract: contract,
    location: location,
    languages: languages,
    tools: tools,
    featured: featured,
    new: true,
  };

  dataa.push(newJob);

  $(".jobListings").empty();
  dataa.forEach((job) => {
    createJobElement(job);
  });
  console.log(dataa);

  $(".close").click();
});
