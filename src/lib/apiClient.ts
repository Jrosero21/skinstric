const PHASE_ONE_URL =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne";

const PHASE_TWO_URL =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

export type PhaseOnePayload = { name: string; location: string };
export type PhaseOneResponse = { SUCCESS?: string } & Record<string, any>;

export async function postPhaseOne(
  payload: PhaseOnePayload
): Promise<PhaseOneResponse> {
  // basic POST with JSON; throws on non-2xx
  const res = await fetch(PHASE_ONE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // bubble up — caller decides what to do
    throw new Error(`PhaseOne HTTP ${res.status}`);
  }

  return res.json();
}


export type PhaseTwoPayload = { image: string }; // base64 string (no data: prefix)
export type PhaseTwoResponse = {
  message?: string;
  data?: {
    race?: Record<string, number>;
    age?: Record<string, number>;
    gender?: Record<string, number>;
  };
} & Record<string, any>;

export async function postPhaseTwo(
  payload: PhaseTwoPayload
): Promise<PhaseTwoResponse> {
  const res = await fetch(PHASE_TWO_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`PhaseTwo HTTP ${res.status}`);
  return res.json();
}
