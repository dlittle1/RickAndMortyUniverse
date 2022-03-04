// useEffect(() => {
//   if (character) {
//     const name = character.name
//     const refactoredName = name.replaceAll(' ', '_')
//     axios
//       .get(
//         `https://rickandmorty.fandom.com/api.php?action=parse&page=${name}&section=2&format=json&origin=*`
//       )
//       .then((res) => setWikiInfo(res.data.parse.text['*']))
//       .catch((err) => console.error(err))
//       .finally(() => parseWiki())

//     console.log('ran')
//   }
// }, [character])

// function parseWiki() {
//   const $ = cheerio.load(wikiInfo)
//   const extractedData = $.html('p')
//   console.log(extractedData)
// }
