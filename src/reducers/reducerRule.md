a reducer can NEVER return UNDEFINED

it must return a value, even if its null, but NEVER undefined.

so when it is called we can set the value to null because it will not have returned any data that very first run of the app

const selectedSongReducer = (selectedSong = null, action) => { etc }
or selectedSong = [] or {} or whatever, but not undefined!

Reducers are pure and cannot reach outside of its function. It cannot get data from elsewhere. It should only return its previous state and the new action payload. 

export default () => {};
BAD BAD BAD

export default () => {
  return 123;
};
GOOD

export default () => {
  return "uytu";
};
GOOD

export default () => {
  return null;
};
GOOD

export default () => {
  return [];
};
GOOD

export default () => {
  return {};
};