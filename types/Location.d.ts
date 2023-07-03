type LocalNames = {
  he?: string;
  lv?: string;
  ur?: string;
  ja?: string;
  ce?: string;
  mr?: string;
  br?: string;
  bg?: string;
  be?: string;
  gl?: string;
  ca?: string;
  hi?: string;
  az?: string;
  tl?: string;
  kg?: string;
  lt?: string;
  uk?: string;
  os?: string;
  ru?: string;
  kn?: string;
  am?: string;
  hy?: string;
  eu?: string;
  mk?: string;
  pt?: string;
  el?: string;
  ko?: string;
  fr?: string;
  ka?: string;
  fa?: string;
  yi?: string;
  eo?: string;
  es?: string;
  kk?: string;
  lo?: string;
  ar?: string;
  th?: string;
  la?: string;
  ta?: string;
  pa?: string;
  sr?: string;
  oc?: string;
  zh?: string;
};

export type LocationCity = {
  name: string;
  local_names: LocalNames;
  country: string;
  state: string;
} & Coord;

export type Coord = {
  lat: number;
  lon: number;
};
