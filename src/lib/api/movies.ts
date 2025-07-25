const BASE_URL = "https://challenge.outsera.tech/api/movies";

// === Tipos ===
export interface YearWinner {
  year: number;
  winnerCount: number;
}

export type ProducerInterval = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};

export type IntervalData = {
  min: ProducerInterval[];
  max: ProducerInterval[];
};

export type Studio = {
  name: string;
  winCount: number;
};

export interface Winner {
  id: number;
  year: number;
  title: string;
}

export interface Movie {
  id: number;
  year: number;
  title: string;
  winner: boolean;
}

export interface MovieResponse {
  content: Movie[];
  totalPages: number;
}

// === Funções ===
export async function getYearsWithMultipleWinners(): Promise<YearWinner[]> {
  const res = await fetch(`${BASE_URL}/yearsWithMultipleWinners`);
  if (!res.ok) {
    throw new Error(`Erro ${res.status} - ${res.statusText}`);
  }
  const { years }: { years: YearWinner[] } = await res.json();
  return years;
}

export async function getMaxMinWinIntervalForProducers(): Promise<IntervalData> {
  const res = await fetch(`${BASE_URL}/maxMinWinIntervalForProducers`);
  if (!res.ok) {
    throw new Error(`Erro ${res.status} - ${res.statusText}`);
  }
  const data: IntervalData = await res.json();
  return data;
}

export async function getStudiosWithWinCount(): Promise<Studio[]> {
  const res = await fetch(`${BASE_URL}/studiosWithWinCount`);
  if (!res.ok) {
    throw new Error(`Erro ${res.status} - ${res.statusText}`);
  }
  const { studios }: { studios: Studio[] } = await res.json();
  return studios.slice(0, 3);
}

export async function getWinnersByYear(year: string): Promise<Winner[]> {
  const res = await fetch(`${BASE_URL}/winnersByYear?year=${year}`);
  if (!res.ok) {
    throw new Error(`Erro ${res.status} - ${res.statusText}`);
  }
  const data: Winner[] = await res.json();
  return data;
}

export async function getMovies(params: {
  page?: number;
  size?: string;
  year?: string;
  winner?: string;
}): Promise<MovieResponse> {
  const query = new URLSearchParams();
  query.set("page", String(params.page ?? 0));
  query.set("size", params.size ?? "10");
  if (params.year) query.set("year", params.year);
  if (params.winner) query.set("winner", params.winner);

  const res = await fetch(`${BASE_URL}?${query.toString()}`);
  if (!res.ok) {
    throw new Error(`Erro ${res.status} - ${res.statusText}`);
  }
  const data: MovieResponse = await res.json();
  return data;
}