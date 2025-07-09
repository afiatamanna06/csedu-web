export function getInitials(name: string) {
  const ignore = ["dr", "md", "mr", "mrs", "miss"];
  const parts = name
    .toLowerCase()
    .split(" ")
    .filter(part => !ignore.includes(part.replace(".", "")) && part !== "");

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return (
    parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase()
  );
}