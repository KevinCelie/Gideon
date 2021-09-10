export default function convertTimeString(timeString) {
  if (!/\d*d?\d*h?\d*m?\d*s?/.test(timeString))
    throw new Error("Invalid format");
  const [, dString, hString, mString, sString] = timeString.match(
    /(\d*d)?(\d*h)?(\d*m)?(\d*s)?/
  );
  let d = 0;
  let h = 0;
  let m = 0;
  let s = 0;
  if (dString) d += Number(dString.replace("d", "")) || !!dString;
  if (hString) h += Number(hString.replace("h", "")) || !!hString;
  if (mString) m += Number(mString.replace("m", "")) || !!mString;
  if (sString) s += Number(sString.replace("s", "")) || !!sString;
  return 24 * 60 * 60 * d + 60 * 60 * h + 60 * m + s;
}
