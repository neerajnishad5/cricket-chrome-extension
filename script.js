(async function getMatchData(){
  try {
    console.log("I am called");
    // calling api
    const data = await fetch(
      "https://api.cricapi.com/v1/currentMatches?apikey=bf7f406c-013c-4f06-8253-cb7311631320&offset=0"
    );

    // getting json data
    const jsonData = await data.json();

    // if not success return
    if (jsonData.status !== "success") return;

    // getting match data
    const matchList = jsonData.data;

    // if array is empty return null array
    if (matchList.length === 0) {
      document.getElementById("#no-match").innerText = "No matches running!";
      return;
    }

    // else get match name and status
    let relevantData = matchList.map((match) => {
      if (match.series_id === "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e") {
        let battingTeam = "";
        if (match.score.length === 1) {
          battingTeam = match.score[0].inning;
          battingTeam = battingTeam.slice(0, -9);
          console.log(battingTeam);
        } else {
          battingTeam = match.score[1].inning;
          battingTeam = battingTeam.slice(0, -9);
          console.log( battingTeam);
        }
        if (match.matchEnded) {
          return `<p><img src=${match.teamInfo[0].img} alt="team-logo"> ${match.teamInfo[0].shortname} vs. ${match.teamInfo[1].shortname} <img src=${match.teamInfo[1].img} alt="team-logo"></p>
                
          <p>Result: ${match.status}</p>`;
        } else if (!match.matchEnded) {
          return `<p><img src=${match.teamInfo[0].img} alt="team-logo"> ${match.teamInfo[0].shortname} vs. ${match.teamInfo[1].shortname} <img src=${match.teamInfo[1].img} alt="team-logo"></p>
        <p>${battingTeam}: ${match.score[0]?.r} - ${match.score[0]?.w}</p>`;
        }
      }
    });

    const finalData = relevantData.filter((match) => match !== undefined);

    // populating li elements
    document.getElementById("matches").innerHTML = finalData
      .map((match) => `<li>${match}</li>`)
      .join("");

    return finalData;
  } catch (error) {
    console.log(error);
  }
})();

// getMatchData();
