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
  d = dString ? (d += Number(dString.replace("d", "")) || 1) : 0;
  h = hString ? (h += Number(hString.replace("h", "")) || 1) : 0;
  m = mString ? (m += Number(mString.replace("m", "")) || 1) : 0;
  s = sString ? (s += Number(sString.replace("s", "")) || 1) : 0;
  return 24 * 60 * 60 * d + 60 * 60 * h + 60 * m + s;
}
