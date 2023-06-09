(async function getMatchData() {
  try {
    // calling api
    const data = await fetch(
      "https://api.cricapi.com/v1/currentMatches?apikey=fe7fe256-39c4-44f5-a7a3-a4967d168e9d&offset=0"
    );

    // getting json data
    const jsonData = await data.json();

    // if not success return
    if (jsonData.status !== "success") return;

    // getting match data
    const matchList = jsonData.data;

    // if array is empty return null array
    if (matchList.length === 0) {
      document.getElementById("#matches").innerText = "No matches running!";
      return;
    }

    // else get match name and status
    let relevantData = matchList.map((match) => {
      if (match.series_id === "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e") {
        let battingTeam = "";
        if (match.score.length === 1) {
          battingTeam = match.score[0].inning;
        } else {
          battingTeam = match.score[1].inning;
        }
        battingTeam = battingTeam.slice(0, -9);
        
        
        if (match.matchEnded) {
          return `<div>
          <div><p>On ${match.date.split("-").reverse().join(".")}</p></div>
          <div><p><img src=${match.teamInfo[0].img} alt="team-logo"> ${
            match.teamInfo[0].shortname
          } vs. ${match.teamInfo[1].shortname} <img src=${
            match.teamInfo[1].img
          } alt="team-logo"></p></div>
                
          <div><span>Result:</span> <span class="result">${
            match.status
          }</span> </div> </div>`;
        } else if (!match.matchEnded) {
          return `<p><img src=${match.teamInfo[0].img} alt="team-logo"> ${match.teamInfo[0].shortname} vs. ${match.teamInfo[1].shortname} <img src=${match.teamInfo[1].img} alt="team-logo"></p>
           
        <p>${battingTeam}: ${match.score[0]?.r} - ${match.score[0]?.w}</p>
        <p>Status: ${match.status}</p>`;
        }
      }
    });

    // removing undefined array objects
    const finalData = relevantData.filter((match) => match !== undefined);

    // populating li elements
    document.getElementById("matches").innerHTML = finalData
      .map((match) => `<li>${match}</li>`)
      .join("");

    return finalData;
  } catch (error) {
    console.log(error);
  }
})()

// getMatchData();