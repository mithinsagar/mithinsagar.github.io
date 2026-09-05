import media from "./media.json";

export type Photo = {
  id: string;
  src: string;
  w: number;
  h: number;
  lqip: string;
  series: string;
  title: string;
  caption: string;
  meta: string;
};

const captions: Record<string, { title: string; caption: string; meta: string }> = {
  "live-01": { title: "Beam", caption: "A silhouette held against the wash while the beams did the composing.", meta: "Live · VIT Chennai" },
  "live-02": { title: "Front line", caption: "Three of them at the lip of the stage, smoke catching the red.", meta: "Live · VIT Chennai" },
  "live-03": { title: "Pyro", caption: "Metered for the flame bar and let everything under it fall away.", meta: "Live · VIT Chennai" },
  "live-04": { title: "The room", caption: "Crowd, stage, crowd — the three frames that describe a night better than one.", meta: "Live · VIT Chennai" },
  "live-05": { title: "Set", caption: "One performer across a full set, cut down to the three moments worth keeping.", meta: "Live · VIT Chennai" },
  "live-06": { title: "Encore", caption: "Flame jets on the last note, shot wide to keep the whole stage.", meta: "Live · VIT Chennai" },
  "stage-01": { title: "Closing act", caption: "Three performers holding the front of the stage as the wash goes red.", meta: "Vibrance · VIT Chennai" },
  "stage-02": { title: "Into the haze", caption: "Backlit through smoke — the only frame that night where the light did all the work.", meta: "Vibrance · VIT Chennai" },
  "stage-03": { title: "Mandala", caption: "Classical set against the projection wall, shot between the two beats of a turn.", meta: "Vibrance · VIT Chennai" },
  "stage-04": { title: "Ignition", caption: "Flame jets on the downbeat. Metered for the fire and let the rest fall away.", meta: "Vibrance · VIT Chennai" },
  "stage-05": { title: "Lift", caption: "A partner lift caught at the top of its arc.", meta: "Vibrance · VIT Chennai" },
  "stage-06": { title: "Monochrome wall", caption: "Warm subject against a cold projection — the contrast was already in the room.", meta: "Vibrance · VIT Chennai" },
  "stage-07": { title: "Amber", caption: "House lights and a single warm key, which is most of what I like about live work.", meta: "Vibrance · VIT Chennai" },
  "stage-08": { title: "Blue set", caption: "Cool backdrop, hot floor. Shot wide to keep the whole stage design.", meta: "Vibrance · VIT Chennai" },
  "stage-09": { title: "Smoke and beam", caption: "Silhouette against the haze, exposure pulled down until only the outline survived.", meta: "Vibrance · VIT Chennai" },
  "stage-10": { title: "Front row", caption: "The moment the crowd noise arrives, before the next line starts.", meta: "Vibrance · VIT Chennai" },
  "stray-01": { title: "The ledge", caption: "Two of them on a brick ledge, holding still for exactly one frame.", meta: "Chennai · August" },
  "stray-02": { title: "Standoff", caption: "Late light off a red wall does the grading for you.", meta: "Chennai · August" },
  "stray-03": { title: "The lookout", caption: "Wide open at the long end, waiting for it to look down the barrel.", meta: "Chennai · August" },
  "stray-04": { title: "Doorway", caption: "Shot from the ground so the doorway reads at their height, not mine.", meta: "Chennai · August" },
  "stray-05": { title: "Close", caption: "The one that stopped moving long enough to be a portrait.", meta: "Chennai · August" },
};

export const seriesInfo = [
  { id: "stage", name: "Stage", note: "Live events, VIT Chennai", blurb: "Concert lighting changes faster than autofocus can follow. Everything here is available light." },
  { id: "stray", name: "Strays", note: "Chennai, August", blurb: "A litter that lived behind the block for a month. Long lens, low angle, no interference." },
];

export const photos: Photo[] = (media.photos as Omit<Photo, "title" | "caption" | "meta">[]).map(
  (p) => ({ ...p, ...(captions[p.id] ?? { title: "Untitled", caption: "", meta: "" }) })
);

/**
 * Rest-state grade. Stage work is already warm, so it only gets a slight pull.
 * The stray series is daylight-green and would fight the palette, so it sits as
 * a warm duotone and returns to full colour on hover and in the viewer.
 */
export function gradeFor(series: string) {
  return series === "stray"
    ? "grayscale sepia-[0.4] brightness-[0.94] contrast-[1.06] group-hover:grayscale-0 group-hover:sepia-0 group-hover:brightness-105 group-hover:contrast-100"
    : "sepia-[0.14] saturate-[0.92] brightness-[0.84] contrast-[1.04] group-hover:sepia-0 group-hover:saturate-100 group-hover:brightness-105 group-hover:contrast-100";
}

export function photosById(ids: string[]) {
  return ids.map((id) => photos.find((p) => p.id === id)).filter(Boolean) as Photo[];
}
