// As I'm not keeping a strict git history writing this, this was attempt
//   number one. The regex solution works a charm, however when given text
//   "ttttt" and subtext "ttt", it will find only one result instead of three.
//   Whether this is correct behaviour or not is unclear - I decided that
//   finding every single substring was more correct.

// // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
// function escapeRegExp(string) {
//   return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
// }
// 
// export function findAllSubstrings(text, subtext) {
//   const re = new RegExp(escapeRegExp(subtext), 'ig');
//   let result = [], match;
//   let count = 0;
//   while ((match = re.exec(text)) != null && ++count < 100) {
//     result[result.length] = match.index;
//   }
//   console.log(result);
//   return result;
// }

// This was all written before I questioned the need of an API or not, so I've
//   included the following as to how an API solution would work in Svelte

// export async function findAllSubstrings(text, subtext, caseSensitive) {
//   // We could just `return await fetch(...` if we don't need to do more
//   const results = await fetch("/api/find-all-substrings/", {
//     method: 'post',
//     headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//     body: JSON.stringify({text, subtext, caseSensitive})
//   });
//   return results;
// }

// Svelte has official TypeScript support but I'm not going to enable it here.
// This solution is the same as the Angular one (just without TS).
export function findAllSubstrings(text, subtext, caseSensitive) {
  if (subtext.length === 0 || text.length === 0 || subtext.length > text.length) {
    return [];
  }

  if (!caseSensitive) {
    text = text.toLowerCase();
    subtext = subtext.toLowerCase();
  }
  
  const upperBoundary = text.length - subtext.length;
  const subtextLength = subtext.length;

  let result = [];

  // An old solution looped through subtext inside this loop instead - the
  //   eventual solution is more maintainable (and probably faster too).
  for (let textIndex = 0; textIndex < upperBoundary; textIndex++) {
    if (text.substring(textIndex, subtextLength) === subtext) {
      result[result.length] = textIndex;
    }
  }
  return result;
}
