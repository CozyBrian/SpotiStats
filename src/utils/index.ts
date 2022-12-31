export const getHashParams = () => {
  const hashParams: any = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

// Format milliseconds into MM:SS
export const formatDuration = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const formatWithCommas = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
