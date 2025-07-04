export function isExpired(dateString?: string): boolean {
  if (!dateString) return false

  try {
    const now = new Date()
    const expiry = new Date(dateString)
    return expiry < now
  } catch {
    console.error("Invalid date format:", dateString)
    return false
  }
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    console.error("Invalid date format:", dateString)
    return dateString
  }
}